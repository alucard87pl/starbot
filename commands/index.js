const ping = require('./ping');
const eightBall = require('./8ball');
const xisy = require('./just');
const roll = require('./roll');
const age = require('./age');

const guildID = process.env.GUILD_ID;
const channelID = process.env.CHANNEL_ID;

const commands = {
    ping,
    '8ball': eightBall,
    'xisy': xisy,
    'roll': roll,
    'r': age
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