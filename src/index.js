const Discord = require("discord.js");
const Tmi = require("tmi.js");
const path = require("path");

let settings = require(path.join(__dirname, "settings.json"));

let discord = new Discord.Client();
let webhook = new Discord.WebhookClient(settings.discord.webhook.id, settings.discord.webhook.token);
let twitch = new Tmi.client({
    options: {
        debug: settings.general.twitchDebug
    },
    connection: {
        reconnect: true,
        secure: true
    },
    "identity": settings.twitch.identity,
    "channels": settings.twitch.channels
});

let GLOBAL = {
    discord,
    webhook,
    twitch,
    settings,
    Discord,
    Tmi
};

require(path.join(__dirname, "relay", "discord.js"))(GLOBAL);
require(path.join(__dirname, "relay", "twitch.js"))(GLOBAL);

process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at:", p, "reason:", reason);
});
