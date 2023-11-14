# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /var/www

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000 (or the port your app runs on)
EXPOSE 3000

# Set the default command to run the application
CMD ["npm", "start"]
