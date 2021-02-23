const cast = (pool) => {
    let regex = /(?<q>\d*)(?<t>\w)(?<n>\d*)/
    let found = pool.match(regex).groups
    let res = []
    for (let c = 0; c < found.q; c++) {
        res.push(die(found.t, found.n));
    }
    return res;
};

const die = (type, max) => {
    if (type == 'f') { //Fudge dice
        return Math.random() > 0.5 ? '+' : '-'
    } else {
        min = Math.ceil(1)
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}

module.exports = async (msg, args) => {
    if (!args.length) return;
    let reply = "Dice Pool Results:\n"
    args.forEach((pool, i) => {
        reply += 'Pool #' + (i + 1) + " **(" + pool + "): **" + cast(pool).join(", ") + '\n'
    });
    console.log(reply)
    await msg.channel.send(reply)
};