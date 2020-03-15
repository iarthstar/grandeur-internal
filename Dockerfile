FROM node:12-alpine

WORKDIR /app

COPY package.json /app/package.json

RUN npm install --production

COPY . /app/

EXPOSE 8080

CMD npm start