FROM node:12.4.0-alpine
RUN apk add --no-cache yarn
RUN yarn add express
RUN yarn add socketio
#RUN yarn add skyway-js
#RUN npm update
#RUN npm i skyway-js
#RUN npm install
#RUN npm i -s skyway-js
COPY package*.json ./

#CMD [ "node", "server.js" ]

WORKDIR /app