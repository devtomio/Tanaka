FROM node:buster

WORKDIR /bot

COPY ["package.json", "yarn.lock", "./"]

# Install system packages
RUN apt-get update
RUN apt-get install -y build-essential ffmpeg wget curl default-jre default-jdk

# Install lavalink
RUN wget https://ci.fredboat.com/repository/download/Lavalink_Build/8837:id/Lavalink.jar

# Install node packages
RUN yarn global add pm2
RUN yarn

COPY . .

CMD ["yarn", "start"]
