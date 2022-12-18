FROM node:16.17-alpine

RUN apk upgrade --available && sync
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]