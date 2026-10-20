# ---- Stage 1: install production dependencies only ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# ---- Stage 2: minimal runtime image ----
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app

# Copy deps from stage 1, then app source (owned by the non-root "node" user)
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .

# Never run as root inside the container
USER node

EXPOSE 5000

# Used by Docker/Compose; Kubernetes uses its own probes against /health
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT:-5000}/health || exit 1

CMD ["node", "server.js"]
