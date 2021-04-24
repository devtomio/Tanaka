FROM debian:buster-slim

WORKDIR /bot

COPY ["package.json", "yarn.lock", "./"]

# Install all stuff needed
RUN apt-get update \
	&& apt-get install -y build-essential software-properties-common curl \
	&& curl -sL https://deb.nodesource.com/setup_16.x | bash - \
	&& apt-get update \
	&& apt-get install -y nodejs openjdk-13-jre openjdk-13-jdk libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev ffmpeg libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb libgbm-dev \
	&& export JAVA_HOME=/usr/lib/jvm/openjdk-13-jdk \
	&& export PATH=$PATH:$JAVA_HOME/bin \
	&& npm i -g yarn \
	&& yarn global add pm2 dotenv-cli node-gyp \
	&& yarn \
	&& yarn add puppeteer \
	&& wget https://github.com/freyacodes/Lavalink/releases/download/3.3.2.5/Lavalink.jar

COPY . .

CMD ["yarn", "start"]
