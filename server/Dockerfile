FROM node:18.13.0
LABEL authors="mjsin"

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 5000



ENTRYPOINT ["npm", "run", "server"]