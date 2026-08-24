FROM node:22-alpine
# for puppiter
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

COPY package*.json /
# to install dependancy we can use npm install as well
RUN npm ci --only=production && npm cache clean --force

ENV NODE_ENV=production
EXPOSE 3000

COPY . .

USER node


CMD [ "node" ,"server.js" ]
