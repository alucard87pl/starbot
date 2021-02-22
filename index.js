// https://discord.js.org/#/docs/main/stable/general/welcome
const Discord = require('discord.js');
require('dotenv').config();

const commandHandler = require('./commands');
const client = new Discord.Client();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', commandHandler);

client.login(process.env.TOKEN);