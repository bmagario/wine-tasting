# Use a Node.js base image
FROM node:latest

# Set the working directory
WORKDIR /wine-taster

# Install project dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose the port
EXPOSE 3000

# Start the application with nodemon
CMD ["npm", "run", "start:dev"]
