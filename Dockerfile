# Use the official Node.js Docker image as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy the rest of the app files to the container
COPY . .

# Expose the port that your Nest.js app is listening on (replace 3000 with your app's port)
EXPOSE 3000

# Set the start command for running your Nest.js app
CMD ["npm", "run", "start:prod"]
