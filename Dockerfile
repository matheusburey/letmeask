FROM oven/bun:latest

WORKDIR /home/app

COPY package.json ./
COPY bun.lockb ./

RUN bun install

EXPOSE 3000

COPY . .

CMD ["bun", "run", "dev"]