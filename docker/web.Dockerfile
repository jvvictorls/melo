FROM node:24-alpine

WORKDIR /app

RUN npm install -g npm@11.19.0

COPY package.json package-lock.json turbo.json ./

COPY apps ./apps
COPY packages ./packages

RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "dev", "--workspace=web"]