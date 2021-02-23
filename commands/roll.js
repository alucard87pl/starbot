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
        max = Math.floor(max);
        return Math.floor(Math.random() * (max + 1)) + 1;
    }

}

module.exports = async (msg, args) => {
    if (!args.length) return;
    console.log('New Roll Command pool:');
    args.forEach((pool, i) => {
        console.log('Pool #' + (i + 1) + " (" + pool + "):", cast(pool).join(","))
    });
};