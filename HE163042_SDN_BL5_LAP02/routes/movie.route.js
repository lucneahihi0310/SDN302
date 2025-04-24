const express = require('express');
const router = express.Router();
const {createMovie , getAllMovies,  getMoviesByStar, countMoviesByDirector } = require('../controller/movie.controller');

const timlog = (req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
}
router.use(timlog);
router.use(express.json());

router.post('/create', createMovie);
router.get('/list', getAllMovies);
router.get('/by-star/:starId', getMoviesByStar);
router.get('/count-by-director/:directorName', countMoviesByDirector);


module.exports = router;