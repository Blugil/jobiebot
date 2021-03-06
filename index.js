const Commando = require('discord.js-commando');
//database imports
const mongo = require('./db/mongo');
const dbConnect = require('./db/mongoconnect')
//utility imports
const react = require('./util/react');
const logMessage = require('./db/messages/message_logs');
const path = require('path');
require('dotenv').config();

const {emote, prefix, owner} = require("./config.json");
const permissions_generator = require('./util/permissions_generator');
const token = process.env.TOKEN;

//instantiates a new comando client with !jobie as command prefix and autoreconnect set to true
const client = new Commando.Client(({
    owner: owner,
    commandPrefix: prefix,
    autoReconnect: 'true'
}));

//registers the commands
client.registry.registerGroups(
    [
        ['simple', 'simple'],
        ['complex', 'complex'],
        ['audio', 'audio']
    ])
.registerDefaults()
.registerCommandsIn(path.join(__dirname, "commands"));

//generates permissions.json file if it doesn't exist in directory
permissions_generator();

//bot on ready function, logs ready and attempts to set status 
client.on('ready', () => {
    console.log("Bot is connected");
    dbConnect(mongo);
    client.user.setActivity('the rain', {
        type: 'LISTENING'
    }).catch(err => {
        console.error('There was an error updating status: ' + err);

    })
});

//logs bot disconnected on bot disconnect
client.on('disconnected', () => {
    console.log("disconnected")
})

//on message function
client.on('message', (message) => {
    react(message, emote);
    logMessage(message, mongo, process.env.DB_NAME)
});

client.login(token);

module.exports = client;