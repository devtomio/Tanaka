FROM node:buster

WORKDIR /bot

COPY ["package.json", "yarn.lock", "./"]

# Install system packages
RUN apt-get update
RUN apt-get install -y build-essential ffmpeg wget curl

# Install java
RUN wget --no-cookies --no-check-certificate --header "Cookie: oraclelicense=accept-securebackup-cookie" https://download.oracle.com/otn-pub/java/jdk/13.0.1+9/cec27d702aa74d5a8630c65ae61e4305/jdk-13.0.1_linux-x64_bin.deb
RUN dpkg -i jdk-13.0.1_linux-x64_bin.deb

# Install lavalink
RUN wget https://ci.fredboat.com/repository/download/Lavalink_Build/8837:id/Lavalink.jar

# Install node packages
RUN yarn global add pm2
RUN yarn

COPY . .

CMD ["yarn", "start"]
