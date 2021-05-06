FROM node:buster

WORKDIR /bot

COPY ["package.json", "yarn.lock", "./"]

# Install all stuff needed
RUN apt-get update \
	&& apt-get install -y build-essential software-properties-common curl wget apt-utils \
	&& apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 0xB1998361219BD9C9 \
	&& echo "deb http://repos.azulsystems.com/debian stable main" | tee /etc/apt/sources.list.d/zulu.list \
	&& apt-get update \
	&& apt-get install -y zulu-15 libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev ffmpeg libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb libgbm-dev \
	&& yarn global add pm2 dotenv-cli node-gyp \
	&& yarn \
	&& yarn add puppeteer \
	&& wget https://github.com/natanbc/andesite/releases/download/0.20.2/andesite-0.20.2-all.jar \
	&& export JAVA_HOME=/usr/lib/jvm/openjdk-15-jdk \
	&& export PATH=$PATH:$JAVA_HOME/bin

COPY . .

CMD ["yarn", "start"]
