const roller = require('rpg-dice-roller');
const exportFormats = require('rpg-dice-roller');

// gave up, someone has this figured out:
// repo: https://github.com/GreenImp/rpg-dice-roller
// docs: https://greenimp.github.io/rpg-dice-roller/

const predefs = {
    'AGE': '{3d6}' //TODO: how to check for doubles
}

module.exports = async (msg, args) => {
    if (!args.length) args = 'AGE';
    args = args.toString().replace(',,', ','); //Roller() only takes one long String argument, not an Array;
    console.log(args)
    console.log("Predef:", args in predefs)
    if (args in predefs) {
        args = predefs[args]
    }
    const roll = new roller.DiceRoll(args)
    const resultString = `${roll}`
    const resultArray = resultString.match()
    console.log(resultString, resultArray) //accessing the group results is going to be a PAIN.

    await msg.channel.send(`${roll}`);
}