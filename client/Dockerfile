FROM node:17-alpine

ENV PORT=3000

WORKDIR /app

COPY . .

RUN npm install

EXPOSE ${PORT}

CMD ["npm" , "run" , "dev"]