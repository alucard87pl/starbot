# StarBot

Starchasers Discord server general puirpose bot-experiment.

## Extending functionality:
In `/commands/index.js` add:

```javascript
const yourcommand = require('./yourcommand'); //remeber! no .js extension here
```

```javascript
const commands = {
    ping,
    '8ball': eightBall,
    'xisjusty': xisjusty,
    'yourcommand': yourcommand
    //does not have to be the same name as the command file
};
```

create `/commands/yourcommand.js`:

```javascript
module.exports = async (msg) => {
    //YOUR CODE HERE
    await msg.channel.send(`${reply}`);
};
```

