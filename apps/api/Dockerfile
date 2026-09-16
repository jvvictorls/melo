FROM node:24-alpine

COPY . .

RUN npm install

COPY src ./src

EXPOSE 3001

CMD ["npm", "run", "dev"]