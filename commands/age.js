const mergeImages = require('merge-images'); // https://github.com/lukechilds/merge-images
const { Canvas, Image } = require('canvas');
const { MessageAttachment } = require('discord.js');



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

module.exports = async (msg) => {
    const roll = [d(6), d(6), d(6)];
    const total = roll.reduce((a, b) => a + b, 0)
    const doubles = roll.some(
        (r, i) => roll.indexOf(r) !== i
    )
    imgList = imageList(roll)
    console.log(imgList)
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
        .then((img) => { rollImg = img; console.log(rollImg) });
    console.log(rollImg)
    await msg.channel.send(`${msg.author} ${roll} ${total} ${doubles}`);
};