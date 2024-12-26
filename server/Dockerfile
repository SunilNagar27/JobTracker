# Base image for Node.js server
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if available, to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm ci --force --production

# Copy the rest of the application files
COPY . .

# Expose the server port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
