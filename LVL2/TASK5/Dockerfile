FROM mcr.microsoft.com/windows/nanoserver:ltsc2022 AS base
WORKDIR /app

COPY package* ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]
