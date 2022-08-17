FROM portenez/node8-base:node8.5-alpine

RUN apk update && apk add bash

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

ENV NODE_EXTRA_CA_CERTS=/app/certs/isrgrootx1

CMD [ "node", "src/index.js" ]

