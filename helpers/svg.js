const { svg2png } = require('svg-png-converter');
const { MessageAttachment } = require('discord.js');
const fs = require("fs");
const { DOMParser, XMLSerializer } = require('xmldom');
const Color = require('color');

function setColor(ele, col) {
    Array.from(ele).forEach(element => {
        element.setAttribute("fill", col)
    });
}


module.exports = async function svgize(result, color) {
    let svg = fs.readFileSync('./assets/dice/d6_' + result + '.svg', "utf-8")
    let xmlDoc = new DOMParser().parseFromString(svg, "text/xml");
    let mainColor = color
    let shadeColor = Color(color).darken(0.4).desaturate(0.2).string()
    let dotColor = '#1f1f1f'
    setColor(xmlDoc.getElementsByClassName('primary'), mainColor)
    setColor(xmlDoc.getElementsByClassName('shadow'), shadeColor)
    setColor(xmlDoc.getElementsByClassName('dot'), dotColor)

    let changed = new XMLSerializer().serializeToString(xmlDoc);

    let s = await svg2png({
        input: changed.trim(),
        encoding: 'dataURL',
        format: 'png',
        multiplier: 0.25,
    })
    return s;
};