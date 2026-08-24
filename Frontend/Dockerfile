#building stage for building dist
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

#stage 2 nginx connectivity
FROM nginx:alpine
# Copy custom Nginx configuration for React Single Page App routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
