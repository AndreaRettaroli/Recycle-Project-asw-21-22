# Use base image
FROM node:lts-alpine
# Set the working directory to /app
ENV WORKINGDIR=/root/app
# set working dir
WORKDIR ${WORKINGDIR}
COPY ./ ${WORKINGDIR}/

ENV MONGO_USER admin
ENV MONGO_PASSWORD admin
ENV MONGO_PORT 27017
# Expose port 5173 for the application
EXPOSE 3000
RUN npm install -g nodemon
RUN npm install

CMD npm run start-in-container
