const client = require('prom-client');

// Collect default metrics (CPU, Memory, Event Loop Lag)
client.collectDefaultMetrics({ timeout: 5000 });

// Histogram for 4 Golden Signals: Latency (p95, p99 percentiles)
const httpRequestDurationSeconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 1, 2.5, 5, 10]
});

// Counter for 4 Golden Signals: Traffic & Errors
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'code']
});

const metricsMiddleware = (req, res, next) => {
  const end = httpRequestDurationSeconds.startTimer();

  res.on('finish', () => {
    // Parameterize route to prevent high-cardinality label explosions
    const route = req.route ? req.baseUrl + req.route.path : req.path;
    const labels = { method: req.method, route, code: res.statusCode };

    end(labels);
    httpRequestsTotal.inc(labels);
  });

  next();
};

const getMetrics = async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
};

module.exports = { metricsMiddleware, getMetrics };
