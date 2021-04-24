FROM node:lts-alpine

WORKDIR /bot

COPY ["package.json", "yarn.lock", "./"]

# Set env variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

# Install stuff
RUN apk update \
	&& apk upgrade \
	&& apk add --no-cache dumb-init curl make gcc g++ python ca-certificates linux-headers binutils-gold gnupg libstdc++ nss chromium wget curl autoconf pixman alpine-sdk cairo pango libpng jpeg build-base giflib librsvg ffmpeg openjdk11 \
	&& wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
	&& wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.33-r0/glibc-2.33-r0.apk \
	&& apk add glibc-2.33-r0.apk \
	&& yarn global add pm2 dotenv-cli node-gyp \
	&& yarn \
	&& yarn add puppeteer-core \
	&& wget https://github.com/freyacodes/Lavalink/releases/download/3.3.2.5/Lavalink.jar \
	&& rm -rf /usr/include \
	&& rm -rf /var/cache/apk/* /root/.node-gyp /usr/share/man /tmp/*

COPY . .

CMD ["yarn", "start"]
