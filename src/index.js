/*
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

//Includes
const Discord = require('discord.js'); // discord.js module
var gm_mod = require('./GameMaster.js');
var gm = gm_mod.instance; //manages sessions
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
    var success;
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    if (message.content.startsWith(config.prefix + "ping")) {
        message.channel.send("pong!");
    } else
    if (message.content.startsWith(config.prefix + "foo")) {
        message.channel.send("bar!");
    } else
    if (message.content.startsWith(config.prefix + "commands")) {
        message.author.send(`Current Commands are: 
         ${config.prefix}commands : Tells you the bot commands!
         ${config.prefix}ping : Gets back a pong.
         -------------------- Managing Sessions ------------------
         ${config.prefix}sessions : Lists currently active sessions.
         ${config.prefix}newsess : Create a new session and join it (if you are not already in a session).
         ${config.prefix}joinsess [mention/number] : Join the session of that number or that the mentioned user is in (if you are not already in a session).
         ${config.prefix}quitsess : Leave your current session.
         ----------------------- Gameplay ------------------------
         ${config.prefix}walkhr [number hours]: Walk your party forward for that many hours.
         ${config.prefix}pos: Reports your party's position (TEMPORARY).`);
    } else
    if (message.content.startsWith(config.prefix + "sessions")) {
        message.author.send(gm.listSessions());
    } else
    if (message.content.startsWith(config.prefix + "newsess")) {
        success = gm.makeSessionFor(message.author.tag);
        if (success === true) {
            message.channel.send("Successfully made a new session for you!");
        }
        else {
            message.channel.send("Command failed; try leaving your current session first!");
        }
    } else
    if (message.content.startsWith(config.prefix + "joinsess")) {
        const join = message.mentions.users.first();
        const snum = Number(message.content.split(' ')[1]);
        //if we have a user mentioned
        if (join) {
            //just join them
            success = gm.addUserByTag(message.author.tag, join.tag);
            if (success === true) {
                message.channel.send(`Successfully joined the session with ${join.username}!`);
            }
            else {
                message.channel.send("Command failed; check if that person in a session right now.");
            }
        } else
        if (isNaN(snum) === false) {//nobody mentioned, try number
            //let's try joining it
            success = gm.addUserByIndex(message.author.tag, snum);
            if (success === true) {
                message.channel.send(`Successfully joined session ${snum}!`);
            }
            else {
                message.channel.send("Command failed; is that a real session, and are you not already in a session?");
            }
        }
        else {//nobody mentioned, not a number
            message.channel.send("Command failed; no session number given, and no user mentioned.");
        }

    } else
    if (message.content.startsWith(config.prefix + "quitsess")) {
        success = gm.removeFromSession(message.author.tag);
        if (success === true) {
            message.channel.send("Successfully left your session!");
        }
        else {
            message.channel.send("Command failed; are you actually in a session?");
        }
    } else
    if (message.content.startsWith(config.prefix + "walkhr")) {//walk the party along
        const walkfor = Number(message.content.split(' ')[1]);
        if (isNaN(walkfor) === false) { //walk for a valid number of hours
            success = gm.walkHr(walkfor, message.author.tag);
            if (success === true) {
                message.channel.send(`You walk forward for about ${walkfor} hours.`);
            }
            else {//the user probably isn't in a session
                message.channel.send("Command failed; you must be in a session first!");
            }
        }
        else {//invalid number of hours
            message.channel.send("Command failed; please use a number (in hours).");
        }
    } else
    if (message.content.startsWith(config.prefix + "pos")) {
        const pos = gm.getPos(message.author.tag);
        if (pos === -1) { //couldn't find user
            message.channel.send("Command failed; are you actually in a session?");
        }
        else {
            message.channel.send(`You are at (${pos.getQ()}, ${pos.getR()}, ${pos.getS()}).`);
        }
    }
});

// Log our bot in
client.login(config.token);
