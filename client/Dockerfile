# Base image for React app
FROM node:18


# Install xdg-utils
# RUN apk add --no-cache xdg-utils

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install --force

# Copy app files
COPY . .

# Build the React app
# RUN npm run build

# Serve the app using a lightweight web server
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["npm","run","dev"]
