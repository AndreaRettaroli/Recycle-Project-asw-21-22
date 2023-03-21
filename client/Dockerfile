# Use base image
FROM node:lts-alpine as base

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY client/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY client/ .

# Build the application
RUN npm run build

# Expose port 5173 for the application
EXPOSE 5173

# Start the application on port 5173
CMD ["npm", "run", "start", "--", "--port", "5173"]