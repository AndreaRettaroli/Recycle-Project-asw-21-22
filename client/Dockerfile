# Use base image
FROM node:lts-alpine

# Set the working directory to /app
ENV WORKINGDIR=/root/app
# set working dir
WORKDIR ${WORKINGDIR}
COPY ./ ${WORKINGDIR}/

# install package.json dependencies
RUN npm install


# Install the dependencies
RUN npm install


# Build the application
RUN npm run build

# Expose port 5173 for the application
EXPOSE 5173

# Start the application on port 5173
CMD npm run start-in-container