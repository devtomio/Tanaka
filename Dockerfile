FROM node:buster

WORKDIR /bot

COPY ["package.json", "yarn.lock", "./"]

# Install system packages
RUN apt-get update
RUN apt-get install -y build-essential ffmpeg curl default-jre default-jdk libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libgbm-dev

# Install lavalink
RUN wget https://github.com/freyacodes/Lavalink/releases/download/3.3.2.5/Lavalink.jar

# Install node packages
RUN yarn global add pm2 dotenv-cli
RUN yarn

COPY . .

CMD ["yarn", "start"]
