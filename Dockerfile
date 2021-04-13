FROM node:buster

ENV NODE_ENV=production

WORKDIR /bot

COPY ["package.json", "yarn.lock", "./"]

RUN apt-get update
RUN apt-get install -y build-essential ffmpeg
RUN yarn

COPY . .

CMD ["yarn", "start"]