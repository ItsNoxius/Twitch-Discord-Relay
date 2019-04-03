module.exports = (GLOBAL) => {
    let discord = GLOBAL.discord;
    let twitch = GLOBAL.twitch;
    let settings = GLOBAL.settings;

    // console.log("[DISCORD] ");

    discord.on("ready", () => {
        console.log("[DISCORD] Connected");
    });

    discord.on("message", message => {
        if (message.channel.id !== settings.discord.channel_id) return;
        if (message.author == discord.user) return;
        if (message.author.bot == true) return;

        let user = "";
        if (settings.general.discordNickname) {
            user = message.member.nickname || message.author.username;
        } else {
            user = message.author.username;
        }

        if (settings.general.discordDiscriminator) {
            user = `${user}#${message.author.discriminator}`;
        }

        twitch.say(settings.twitch.channels[0], `${user} - ${message}`);
    });

    discord.login(settings.discord.token).then(() => {
        console.log("[DISCORD] Successfully verified identity");
    }).catch(error => {
        console.log("[DISCORD] " + error.message);
    });
};
