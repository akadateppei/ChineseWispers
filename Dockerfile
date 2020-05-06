FROM node:12.4.0-alpine
RUN apk add --no-cache yarn
RUN yarn add express
RUN yarn add socketio

CMD [ "node", "server.js" ]

WORKDIR /app