FROM node

WORKDIR /ray/app

COPY ./package.json /ray/app/

RUN npm install

COPY . /ray/app/

EXPOSE 5000

CMD ["node", "index.js"]