FROM node:buster

WORKDIR /bot

COPY ["package.json", "yarn.lock", "./"]

RUN apt-get update
RUN apt-get install -y build-essential ffmpeg
RUN yarn global add pm2
RUN yarn

COPY . .

CMD ["yarn", "start"]
