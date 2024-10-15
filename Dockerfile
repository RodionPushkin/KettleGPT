FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm i @rollup/rollup-linux-x64-musl

CMD ["npm", "run", "dev"]
