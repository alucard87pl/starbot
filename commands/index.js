const ping = require('./ping');
const eightBall = require('./8ball');
const xisjusty = require('./just');
const roll = require('./roll');

const guildID = process.env.GUILD_ID;
const channelID = process.env.CHANNEL_ID;

const commands = {
    ping,
    '8ball': eightBall,
    'xisjusty': xisjusty,
    'roll': roll
};

const prefix = '!'

module.exports = async (msg) => {
    const args = msg.content.split(' ');
    if (args[0].charAt(0) !== prefix) return;
    const command = args.shift().substr(1);
    if (Object.keys(commands).includes(command)) {
        commands[command](msg, args);
    }
};