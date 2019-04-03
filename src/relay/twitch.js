const axios = require("axios");

module.exports = (GLOBAL) => {
    let discord = GLOBAL.discord;
    let twitch = GLOBAL.twitch;
    let settings = GLOBAL.settings;
    let webhook = GLOBAL.webhook;

    // console.log("[TWITCH] ");

    twitch.on("message", (channel, userstate, message, self) => {
        if (self) return;

        if (settings.general.twitchUserIcons) {
            twitch.api({
                url: "https://api.twitch.tv/helix/users?id=" + userstate["user-id"],
                headers: {
                    "Client-ID": settings.twitch.identity.clientid
                }
            }, (err, res, body) => {
                let avatar = body.data[0].profile_image_url || "https://www.twitch.tv/p/assets/uploads/glitch_474x356.png";

                axios.post(`https://discordapp.com/api/webhooks/${settings.discord.webhook.id}/${settings.discord.webhook.token}`, {
                    "username": userstate["display-name"],
                    "avatar_url": avatar,
                    "content": message
                }).then(response => {}).catch(console.log);
            });
        } else {
            axios.post(`https://discordapp.com/api/webhooks/${settings.discord.webhook.id}/${settings.discord.webhook.token}`, {
                "username": userstate["display-name"],
                "content": message
            }).then(response => {}).catch(console.log);
        }
    });

    twitch.on("join", (channel, username, self) => {
        console.log("[TWITCH] Joined " + channel);
    });

    twitch.on("logon", () => {
        console.log("[TWITCH] Connected.");
    });

    twitch.connect();
};
