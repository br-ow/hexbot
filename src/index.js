/*
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

//Includes
const Discord = require('discord.js'); // discord.js module
const config = require('../config.json'); //Config file

// Create an instance of a Discord client
const client = new Discord.Client();

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
    console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    if (message.content.startsWith(config.prefix + "ping")) {
        message.channel.send("pong!");
    } else
    if (message.content.startsWith(config.prefix + "foo")) {
        message.channel.send("bar!");
    }
});

// Log our bot in
client.login(config.token);
