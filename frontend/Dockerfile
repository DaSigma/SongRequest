# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json into the container at /app
COPY package*.json /app/

# Install any needed packages
RUN npm install

# Copy the rest of the application code into the container at /app
COPY . /app/

# Build the React app
RUN npm install --no-cache


# Make port 3000 available to the world outside this container
EXPOSE 8080

# Run the app
CMD ["npm", "run", "dev"]
