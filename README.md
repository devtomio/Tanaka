<img src="https://cdn.discordapp.com/avatars/804605929944645672/573a4c5b59caaf0b48c422b40f11d3ed.png?size=4096" width="150" height="150" align="left" style="float: left; margin: 0 10px 0 0;" alt="Tanaka" />

# Tanaka

[![Discord](https://discord.com/api/guilds/830047984573480970/embed.png)](https://discord.gg/zGvtAnGhdP)

Tanaka is a Discord Bot coded in [JavaScript](https://www.javascript.com/) with [discord.js](https://discord.js.org) using the [Commando](https://github.com/discordjs/Commando) framework.
<br />
<br />

## Copyright

- ©2021 [Yoshida Tomio](https://github.com/1chiSensei)

## Invite

- [Support Server](https://discord.gg/zGvtAnGhdP)
- [Bot Invite](https://peico.xyz/T4DQP)

## Permissions

- **Manage Webhooks** is required for the `anime-updates` command.
- **Create Instant Invite** is required for the `serverinfo` command.
- **Change Nickname** is optional. (But recommended.)
- **Read Messages** is required for every command.
- **Send Messages** is required for every command.
- **Embed Links** is required for every command that sends an embed.
- **Attach Files** is required for every command that attaches a file.
- **Add Reactions** is required for every command that sends a reaction.
- **Use External Emojis** is required for every command.
- **Read Message History** is required for every command.
- **Send TTS Message** is required for every command that sends a TTS message.
- **View Channel** is required for every command.
- **Connect** is required for music commands.
- **Speak** is required for music commands.
- **Use Voice Activity** is required for music commands.
- **Priority Speaker** is required for music commands.

## Installing

### Requirements

- [Node.js](https://nodejs.org) you will need version `14.x` or greater.
- [Git](https://git-scm.com)
- [Redis](https://redis.io/)
- [MongoDB](https://www.mongodb.com/)
- [Python](https://www.python.org/)
- [Github CLI](https://cli.github.com)
- [FFmpeg](https://www.ffmpeg.org/)
- [Yarn](https://yarnpkg.com/)
- A C/C++ compiler

### Before You Begin

1. Clone this repository with `gh repo clone 1chiSensei/Tanaka`
2. Run `cd Tanaka` to move into the folder that you just created.
3. Run `yarn` to install the dependencies.
4. Create a file named `.env` and fill it out as shown in `.env.example`.

### Filling out your `.env` file

- `REDIS_URL` the connection string to Redis.
- `MONGO_URL` the connection string to MongoDB.
- `DISCORD_TOKEN` your discord bot token. This can be obtained in the [Discord Developer Portal](https://discord.com/developers/applications).
- `OWNER_ID` your own discord user id.
- `TEST_WEBHOOK_ID` the id for the test webhook.
- `TEST_WEBHOOK_TOKEN` the token for the test webhook.
- `GITHUB_TOKEN` your own github personal access token.
- `CLIENT_ID` the bot's client id.
- `CLIENT_SECRET` the bot's client secret.

## Commands

Total: 46

### Utility:

- **prefix:** Shows or sets the command prefix.
- **eval:** Executes arbitrary JavaScript code. (Owner-Only)
- **exec:** Executes a command line application. (Owner-Only)
- **ping:** Shows you the latency of the bot and the database.
- **restart:** Restarts the bot. (Owner-Only)

### Random Response:

- **advice:** Responds with a random advice.
- **bird:** Responds with a random bird image.
- **bunny:** Responds with a random bunny image.
- **cat:** Responds with a random cat image.
- **dog:** Responds with a random dog image.
- **duck:** Responds with a random duck image.
- **fact:** Responds with a random fact.
- **fml:** Responds with a random FML quote.
- **fox:** Responds with a random fox image.
- **koala:** Responds with a random panda image.
- **lizard:** Responds with a random lizard image.
- **owl:** Responds with a random owl image.
- **panda:** Responds with a random panda image.
- **shiba:** Responds with a random shiba inu image.

### Information:

- **help:** Displays a list of available commands, or detailed information for a specific command.
- **info:** Responds with the general information of the bot.
- **serverinfo:** Responds with the server's general information.
- **support:** Sends the support server of the bot.
- **userinfo:** Responds with the user's general information.

### Search:

- **anime:** Searches MyAnimeList for the anime that you give.
- **mdn:** Searches MDN for your query.
- **screenshot:** Screenshots a website.

### Reminder:

- **delete-reminder:** Deletes your reminder.
- **remind:** Sets a reminder.

### Anime Updates:

- **anime-updates:** Sets the anime updates channel.
- **delete-update-channel:** Deletes the anime updates channel.

### Code Bins:

- **hastebin:** Uploades your code to https://hastebin.com.
- **nopaste:** Uploades your code to https://nopaste.ml.
- **sourcebin:** Uploades your code to https://sourceb.in.
- **starbin:** Uploades your code to https://starb.in.

### Image Manipulation:

- **glitch:** Applies the glitch effect to an image.
- **triggered:** Applies the triggered effect to an image.

### Music:

- **play:** Add's music to the music queue.
- **queue:** Shows the music queue.
- **stop:** Stops the music queue.

### Commands:

- **groups:** Lists all command groups.
- **enable:** Enables a command or command group.
- **disable:** Disables a command or command group.
- **reload:** Reloads a command or command group. (Owner-Only)
- **load:** Loads a new command. (Owner-Only)
- **unload:** Unloads a command. (Owner-Only)
