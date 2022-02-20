FROM node:16.14.0

WORKDIR /frontend

COPY package*.json  /frontend

RUN npm install

COPY . .

ENV PORT 3000

EXPOSE $PORT

CMD ["npm", "start"]



