const roller = require('rpg-dice-roller');
// gave up, someone has this figured out:
// repo: https://github.com/GreenImp/rpg-dice-roller
// docs: 

module.exports = async (msg, args) => {
    let reply = 'Your Rolls:\n'
    if (!args.length) return;
    args.forEach((r, index) => {
        const roll = new roller.DiceRoll(r)
        console.log(index, roll)
        reply += 'Notation #' + (index + 1) + ': \`' + roll + `\`\n`
    });
    await msg.channel.send(`${reply}`);
}