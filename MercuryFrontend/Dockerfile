FROM node:18.18-alpine

WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install
# RUN npm ci
COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
