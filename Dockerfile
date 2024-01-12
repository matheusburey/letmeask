FROM node:18-alpine

USER root

WORKDIR /home/frontend

COPY package.json ./

RUN npm install

EXPOSE 5173

COPY . .

CMD ["npm", "run", "dev"]