FROM node:18-alpine

WORKDIR /app

# Install minimal dependencies
COPY package.json ./
RUN npm install --production && npm cache clean --force

# Copy CloudFlare proxy service
COPY cloudflare-proxy.js ./

# Security hardening
RUN addgroup -S cfuser && adduser -S cfuser -G cfuser
USER cfuser

EXPOSE 8080

CMD ["node", "cloudflare-proxy.js"]