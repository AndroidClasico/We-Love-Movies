const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function theatersList(req, res){
    const data = await service.theatersList();
    res.json({ data })
}


module.exports = {
    list: asyncErrorBoundary(theatersList),
}