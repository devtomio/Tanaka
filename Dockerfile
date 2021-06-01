FROM node:15-buster

WORKDIR /bot

COPY . /bot

# Install all stuff needed
RUN apt-get update \
	&& apt-get install -y build-essential git neofetch software-properties-common curl wget apt-utils \
	&& apt-get update \
	&& apt-get install -y nodejs libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev ffmpeg \
	&& npm i -g pm2 dotenv-cli typescript \
	&& yarn

COPY . .

CMD ["yarn", "start"]
