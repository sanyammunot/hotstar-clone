const router = require('express').Router()
const axios = require('axios')

router.get('/movies',async(req, res)=>{
    try {
        const language = req.query.language
        const url = 'https://api.themoviedb.org/3/discover/movie?api_key=23c421d7119114c8fafc43641f433e4c&include_adult=false&include_video=false&language=${language}&page=1&sort_by=popularity.desc';

        // const url = `https://api.themoviedb.org/3/discover/movie?api_key=23c421d7119114c8fafc43641f433e4c&with_original_language=${language}&language=${language}&sort_by=original_title.asc&year=2022&page=1`
        const response = await axios.get(url)
        return res
        .send(response.data)
    } catch (error) {
        return res
        .status(500)
        .send({
            message : error.message,
            location : "movie.controller"
        })
    }
})
router.get('/tv',async(req, res)=>{
    try {
        const language = req.query.language
        const url = `https://api.themoviedb.org/3/tv/popular?api_key=23c421d7119114c8fafc43641f433e4c&with_original_language=${language}&language=${language}&page=1`
        const response = await axios.get(url)
        return res
        .send(response.data)
    } catch (error) {
        return res
        .status(500)
        .send({
            message : error.message,
            location : "movie.controller"
        })
    }
})
router.get('/search',async(req, res)=>{
    try {
        const q = req.query.q
        const language = req.query.language || "en-US";
        url = `https://api.themoviedb.org/3/search/movie?api_key=23c421d7119114c8fafc43641f433e4c&language=${language}&query=${q}&page=1&include_adult=false`
        const response = await axios.get(url)
        return res
        .send(response.data)
    } catch (error) {
        return res
        .status(500)
        .send({
            message : error.message,
            location : "movie.controller"
        })
    }
})
module.exports = router

