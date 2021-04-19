FROM node:buster

WORKDIR /bot

COPY ["package.json", "yarn.lock", "./"]

# Install system packages
RUN apt-get update
RUN apt-get install -y build-essential ffmpeg wget curl default-jre default-jdk

# Install lavalink
RUN wget https://github.com/freyacodes/Lavalink/releases/download/3.3.2.5/Lavalink.jar

# Install node packages
RUN yarn global add pm2 dotenv-cli
RUN yarn

COPY . .

CMD ["yarn", "start"]
