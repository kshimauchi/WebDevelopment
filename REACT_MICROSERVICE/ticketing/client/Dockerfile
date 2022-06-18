FROM node:16.15.1-alpine

RUN apk upgrade --available && sync
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]