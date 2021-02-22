const ping = require('./ping');
const eightBall = require('./8ball');
const xisjusty = require('./just');

const guildID = process.env.GUILD_ID;
const channelID = process.env.CHANNEL_ID;

const commands = {
    ping,
    '8ball': eightBall,
    'xisjusty': xisjusty
};

const prefix = '!'

module.exports = async (msg) => {
    console.log(msg.content);
    const args = msg.content.split(' ');
    if (args[0].charAt(0) !== prefix) return;
    const command = args.shift().substr(1);
    if (Object.keys(commands).includes(command)) {
        commands[command](msg, args);
    }
};