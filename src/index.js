/*
 * Main bot file for Hexbot
 * Author: Brifactor
 * Starting-point/Reference: https://discord.js.org/#/docs/main/stable/examples/ping
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
         ${config.prefix}pos: Reports your party's position (TEMPORARY).
         ${config.prefix}turn [slightly/direction]: Turn in a direction. 90 degrees is the default; add "slightly" before your direction to make it 45 degrees instead. Or just say "around" to about-face.`);
    } else
    if (message.content.startsWith(config.prefix + "sessions")) {
        message.author.send(gm.listSessions());
    } else
    if (message.content.startsWith(config.prefix + "newsess")) {
        success = gm.makeSessionFor(message.author.tag);
        if (success === true) {
            message.channel.send(`${message.author.username}: Successfully made a new session for you!`);
        }
        else {
            message.channel.send(`${message.author.username}: Command failed; try leaving your current session first!`);
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
                message.channel.send(`${message.author.username}: Successfully joined the session with ${join.username}!`);
            }
            else {
                message.channel.send(`${message.author.username}: Command failed; check if that person in a session right now.`);
            }
        } else
        if (isNaN(snum) === false) {//nobody mentioned, try number
            //let's try joining it
            success = gm.addUserByIndex(message.author.tag, snum);
            if (success === true) {
                message.channel.send(`${message.author.username}: Successfully joined session ${snum}!`);
            }
            else {
                message.channel.send(`${message.author.username}: Command failed; is that a real session, and are you not already in a session?`);
            }
        }
        else {//nobody mentioned, not a number
            message.channel.send(`${message.author.username}: Command failed; no session number given, and no user mentioned.`);
        }

    } else
    if (message.content.startsWith(config.prefix + "quitsess")) {
        success = gm.removeFromSession(message.author.tag);
        if (success === true) {
            message.channel.send(`${message.author.username}: Successfully left your session!`);
        }
        else {
            message.channel.send(`${message.author.username}: Command failed; are you actually in a session?`);
        }
    } else
    if (message.content.startsWith(config.prefix + "walkhr")) {//walk the party along
        const walkfor = Number(message.content.split(' ')[1]);
        if (isNaN(walkfor) === false) { //walk for a valid number of hours
            success = gm.walkHr(walkfor, message.author.tag);
            if (success === true) {
                message.channel.send(`${message.author.username}: Your party walks forward for about ${walkfor} hours.`);
            }
            else {//the user probably isn't in a session
                message.channel.send(`${message.author.username}: Command failed; you must be in a session first!`);
            }
        }
        else {//invalid number of hours
            message.channel.send(`${message.author.username}: Command failed; please use a number (in hours).`);
        }
    } else
    if (message.content.startsWith(config.prefix + "pos")) {
        const pos = gm.getPos(message.author.tag);
        if (pos === -1) { //couldn't find user
            message.channel.send(`${message.author.username}: Command failed; are you actually in a session?`);
        }
        else {
            message.channel.send(`You are at (${pos.getQ()}, ${pos.getR()}, ${pos.getS()}).`);
        }
    } else
    if (message.content.startsWith(config.prefix + "turn")) {//turn party
        const first_word = message.content.split(' ')[1];
        var angle = 0; //if we aren't turning
        var way_going = "error"; //should always end up set before it's used
        if ((first_word === "slightly") || (first_word === "slight") ||
         (first_word === "s")) { //only 45 degrees
            const second_word = message.content.split(' ')[2];

            if (second_word === "around" || second_word === "a") {
                message.channel.send(`${message.author.username}: Command failed; you cannot turn slightly around.`);
            } else
            if (second_word === "right" || second_word === "r") {
                angle = 1;
                way_going = "slightly right";
            } else
            if (second_word === "left" || second_word === "l") {
                angle = -1;
                way_going = "slightly left";
            }
            else {//invalid input
                message.channel.send(`${message.author.username}: Command failed; please use 'slightly' (or not) and 'left', 'right' or 'around'.`);
            }
        } else
        if (first_word === "around" || first_word === "a") {
            angle = 4;
            way_going = "around";
        } else
        if (first_word === "right" || first_word === "r") {
            angle = 2;
            way_going = "right";
        } else
        if (first_word === "left" || first_word === "l") {
            angle = -2;
            way_going = "left";
        }
        else {//invalid input
            message.channel.send(`${message.author.username}: Command failed; please use 'slightly' (or not) and 'left', 'right' or 'around'.`);
        }
        if (angle != 0) {//valid update
            gm.turn(angle, message.author.tag);
            message.channel.send(`${message.author.username}: Your party turns ${way_going}.`);
        }
    }
});

// Log our bot in
client.login(config.token);
