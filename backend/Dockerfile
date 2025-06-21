# Use an official Node.js image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
COPY .env .
RUN npm install

# Copy the rest of the app
COPY . .

# Expose backend port (change if your app uses a different port)
EXPOSE 5000

# Start the backend
CMD ["npm", "run", "start"]
