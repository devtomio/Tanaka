FROM adoptopenjdk/openjdk15:debian

WORKDIR /bot

COPY . /bot

# Install all stuff needed
RUN apt-get update \
	&& apt-get install -y build-essential git neofetch software-properties-common curl wget apt-utils \
	&& curl -sL https://deb.nodesource.com/setup_15.x | bash - \
	&& apt-get update \
	&& apt-get install -y nodejs libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev ffmpeg \
	&& npm i -g yarn pm2 dotenv-cli node-gyp \
	&& yarn \
	&& wget https://github.com/freyacodes/Lavalink/releases/download/3.3.2.5/Lavalink.jar

COPY . .

CMD ["yarn", "start"]
