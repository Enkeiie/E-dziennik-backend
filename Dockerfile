# Use the official Node.js image as the base image
FROM node:14-alpine

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Set Python 3 as the default Python version
RUN ln -sf python3 /usr/bin/python

RUN yarn global add @nestjs/cli


    # Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install the dependencies using yarn
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the app will listen on
EXPOSE 3000

# Start the app
CMD [ "yarn","run", "start" ]