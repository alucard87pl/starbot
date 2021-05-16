//"I WILL REFACTOR THIS LATER" © Daniel Schiffman
const mergeImages = require('merge-base64');

const { Canvas, Image } = require('canvas');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const svgize = require('../helpers/svg');

function d(s) {
    min = Math.ceil(1);
    max = Math.floor(s);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function richEmbedRollCommandResponseCrafter(roll, total, doubles) { //enterprise code is FUN, isn't it? ;)
    let dbl = doubles ? "✨ YAY! ✨" : "Nay...😥"
    let stn = doubles ? roll[2] : 0
    const embed = new MessageEmbed()
        .setColor(doubles ? '#e86845' : '#45c5e8')
        .setTitle('Your roll results are in!')
        .addFields(
            { name: 'Total', value: total, inline: true },
            { name: 'Doubles', value: dbl, inline: true },
        )
        .setImage('attachment://output.png')
    if (doubles) {
        embed.addFields({ name: 'Stunts', value: stn, inline: true })
    }
    return embed
}

module.exports = async (msg) => {
    const roll = [d(6), d(6), d(6)];
    const total = roll.reduce((a, b) => a + b, 0)
    const doubles = roll.some(
        (r, i) => roll.indexOf(r) !== i
    );

    const [d1, d2, d3] = await Promise.all([
        svgize(roll[0], '#e86845'),
        svgize(roll[1], '#e86845'),
        svgize(roll[2], '#45c5e8')
    ])

    const mergedImage = await mergeImages(
        [
            new Buffer.from(d1.split(",")[1], "base64"),
            new Buffer.from(d2.split(",")[1], "base64"),
            new Buffer.from(d3.split(",")[1], "base64")
        ],
        { offset: 3 }
    );

    const sfbuff = new Buffer.from(mergedImage.split(",")[1], "base64");
    const sfattach = new MessageAttachment(sfbuff, "output.png");
    embed = richEmbedRollCommandResponseCrafter(roll, total, doubles)
    msg.channel.send(`${msg.author}`, { embed, files: [sfattach] })
}