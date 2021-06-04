#Specifiy base image
FROM node:alpine

WORKDIR /usr/app

# relative context, docker build . inside project dir
# current working into current container
COPY ./ ./

# Install some dependencies
RUN npm install


# Default command, in parts
CMD ["npm","start"]
