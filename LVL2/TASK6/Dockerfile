FROM mhart/alpine-node:latest
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "monitor.js"]
