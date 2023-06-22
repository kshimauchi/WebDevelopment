FROM node:16.20.1-alpine

RUN apk upgrade --available && sync
WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]