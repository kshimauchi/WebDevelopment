#Specifiy base image
FROM node:21.2-alpine3.18

# Do not overwrite files inside the root directory of the container
# copy to this work directory 
WORKDIR /usr/app

# relative context, docker build . inside project dir
# current working into current container
# one way of changing this rather than rebuilding
# is we split our copy command to speed up the is running
# copy of the package json which npm needs and then 
# by running the copy command after
COPY ./package.json ./

# Install some dependencies, gets skipped.
RUN npm install

COPY ./ ./

# Default command, in parts
CMD ["npm","start"]

