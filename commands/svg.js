const { svg2png } = require('svg-png-converter');
const { MessageAttachment } = require('discord.js');
const fs = require("fs");
const { DOMParser, XMLSerializer } = require('xmldom');

module.exports = async (msg, args) => {
    let svg = fs.readFileSync('./assets/dice/d' + args[1] + '.svg', "utf-8")
    let xmlDoc = new DOMParser().parseFromString(svg, "text/xml");
    xmlDoc.getElementById('p').setAttribute("fill", args[0])
    let changed = new XMLSerializer().serializeToString(xmlDoc);

    let s = await svg2png({
        input: changed.trim(),
        encoding: 'dataURL',
        format: 'png',
    })

    const sfbuff = new Buffer.from(s.split(",")[1], "base64");
    const sfattach = new MessageAttachment(sfbuff, "output.png");
    await msg.channel.send(`${msg.author}`, sfattach);
};