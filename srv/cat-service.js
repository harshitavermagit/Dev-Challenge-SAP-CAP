const cds = require("@sap/cds");
module.exports = cds.service.impl(async function () {

const remote = await cds.connect.to('RemoteService');
this.on('*', 'Players', async (req) => {
    console.log('>> delegating to remote service...')
    return remote.run(req.query)
});

this.on("CREATE", "Holes", async function (req, next) {

    var value = req.data.score - req.data.par;

    switch (value) {
        case 1: req.data.result = "bogey";
            break;
        case 2: req.data.result = "double bogey";
            break;
        case 3: req.data.result = "triple bogey";
            break;
        case 0: req.data.result = "par";
            break;
        case -1: req.data.result = "birdie";
            break;
        case -2: req.data.result = "eagle";
            break;
        case -3: req.data.result = "albatross";
            break;

    }
    if (req.data.score === 1) {
        req.data.result = "hole in one"
    }
    await next();
});

});