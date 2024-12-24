# Base image for Node.js server
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install --force 

# Copy server files
COPY . .

# Expose server port
EXPOSE 5000

# Start the server
CMD ["npm", "run","dev"]
