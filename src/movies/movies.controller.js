const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function movieExists(req, res, next){

}

async function list(req, res){
    const data = await service.list(req.query.is_showing);
    res.json({ data })
}


async function readTheaters(req, res) {
    const data = await service.readTheaters(res.locals.movie.movie_id)
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheaters)],
}