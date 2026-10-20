# ---- Stage 1: build the Vite app ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
# --legacy-peer-deps: React 19 conflicts with some older peer ranges
RUN npm ci --legacy-peer-deps

COPY . .

# VITE_* values are baked into the JS bundle at build time (not runtime).
# Pass them with --build-arg; do NOT put secrets here, the browser can read them.
ARG VITE_API_URL=http://localhost:5000
ARG VITE_APP_EMAILJS_SERVICE_ID
ARG VITE_APP_EMAILJS_TEMPLATE_ID
ARG VITE_APP_EMAILJS_PUBLIC_KEY
ENV VITE_API_URL=$VITE_API_URL \
    VITE_APP_EMAILJS_SERVICE_ID=$VITE_APP_EMAILJS_SERVICE_ID \
    VITE_APP_EMAILJS_TEMPLATE_ID=$VITE_APP_EMAILJS_TEMPLATE_ID \
    VITE_APP_EMAILJS_PUBLIC_KEY=$VITE_APP_EMAILJS_PUBLIC_KEY

RUN npm run build

# ---- Stage 2: serve static files with nginx (non-root) ----
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ || exit 1
