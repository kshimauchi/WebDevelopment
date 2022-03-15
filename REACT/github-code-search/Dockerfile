FROM node:current-alpine
RUN apk upgrade --available && sync
WORKDIR /app

COPY package*.json ./
RUN yarn install --only=prod
COPY . .
CMD ["yarn", "start"]