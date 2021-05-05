//"I WILL REFACTOR THIS LATER" © Daniel Schiffman

const mergeImages = require('merge-images'); // https://github.com/lukechilds/merge-images
const { Canvas, Image } = require('canvas');
const { MessageAttachment, MessageEmbed } = require('discord.js');

function d(s) {
    min = Math.ceil(1);
    max = Math.floor(s);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function imageList(roll) {
    list = [];
    list.push('./assets/dice/d' + roll[0] + 'b.png')
    list.push('./assets/dice/d' + roll[1] + 'b.png')
    list.push('./assets/dice/d' + roll[2] + 'r.png')
    return list
}
var rollImg;

function richEmbedRollCommandResponseCrafter(roll, total, doubles) { //enterprise code is FUN, isn't it? ;)
    let dbl = doubles ? "✨ YAY! ✨" : "Nay...😥"
    let stn = doubles ? roll[2] : 0
    const embed = new MessageEmbed()
        .setColor('#0099ff')
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
    )
    imgList = imageList(roll)
    mergeImages([
        { src: imgList[0], x: 0, y: 0 },
        { src: imgList[1], x: 67, y: 0 },
        { src: imgList[2], x: 134, y: 0 }
    ],
        {
            Canvas: Canvas,
            Image: Image,
            width: 201,
            height: 67
        },
    )
        .then((img) => {
            rollImg = img
            const sfbuff = new Buffer.from(rollImg.split(",")[1], "base64");
            const sfattach = new MessageAttachment(sfbuff, "output.png");
            embed = richEmbedRollCommandResponseCrafter(roll, total, doubles)
            msg.channel.send(`${msg.author}`, { embed, files: [sfattach] })
            //hacky sacky, JS is whacky
        });
};