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
ENV TOKEN_KEY=dcc39bc5fb0cec04c437449a97aead089f9db09f2267f69191cd4ce85b24e9fbea23cc54cf9ed5c70c34cfc5d71b64e5fa00c2a6b1ed39e8fdbd43925317138e
ENV PORT=3000
# Expose port 5173 for the application
EXPOSE 3000
RUN npm install -g nodemon
RUN npm install

CMD npm run start-in-container
