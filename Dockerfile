# Lightweight official Node.js image (Alpine = small size, fewer packages to attack)
FROM node:22-alpine

# Run Node.js in production mode (faster, less debug output)
ENV NODE_ENV=production

# All application files live in /app
WORKDIR /app

# Copy only dependency files first so Docker can cache the install step
COPY package*.json ./

# Install production dependencies only, then remove the npm cache to keep the image small
RUN npm ci --omit=dev && npm cache clean --force

# Copy the application source code, owned by the non-root "node" user
COPY --chown=node:node . .

# Document the port the app listens on
EXPOSE 3001

# Run everything below as a non-root user (fixes Trivy DS-0002)
USER node

# Docker marks the container "unhealthy" if the app stops responding
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3001/ || exit 1

# Start the application
CMD ["node", "server.js"]