# Use an existing base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port for the container to listen on
EXPOSE 3000

# Set the command to start the application
CMD ["npm", "start"]