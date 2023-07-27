# Use the official Node.js Docker image as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the dependencies file to the working directory
COPY . .

# Install app dependencies
RUN npm ci

# Build the app
RUN npm run build

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]
