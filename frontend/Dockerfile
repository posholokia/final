FROM node:14-alpine

WORKDIR /app/front

COPY ./package*.json /app/front

RUN npm install

COPY . /app/front
