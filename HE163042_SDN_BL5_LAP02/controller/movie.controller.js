const Movie = require('../models/movie.model');
const Producer = require('../models/producer.model');
const Director = require('../models/director.model');
const Star = require('../models/star.model');

const allowedGenres = ["Action", "Drama", "Comedy", "Cartoon"];

exports.createMovie = async (req, res) => {
    try {
      const {
        title,
        release,
        description,
        producer,
        director,
        genres,
        stars
      } = req.body;
  
      if (!title) {
        return res.status(500).json({
          error: {
            status: 500,
            message: "movie validation failed: title: The movie title is required"
          }
        });
      }
  
      // Kiểm tra genres có hợp lệ không và tạo thông báo chi tiết
      const invalidGenres = [];
      genres.forEach((g, i) => {
        if (!allowedGenres.includes(g)) {
          invalidGenres.push(`genres.${i}: ${g} is not supported`);
        }
      });
  
      if (invalidGenres.length > 0) {
        return res.status(500).json({
          error: {
            status: 500,
            message: `movie validation failed: ${invalidGenres.join(', ')}`
          }
        });
      }
  
      // Tạo movie
      const newMovie = new Movie({
        title,
        release,
        description,
        producer,
        director,
        genres,
        stars
      });
  
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (error) {
      res.status(500).json({
        error: {
          status: 500,
          message: "Error creating movie",
          details: error.message
        }
      });
    }
  };

  exports.getAllMovies = async (req, res) => {
    try {
      const movies = await Movie.find()
        .populate('producer', 'name') 
        .populate('director')
        .populate('stars');
  
      
      const formattedMovies = movies.map(movie => ({
        _id: movie._id,
        title: movie.title,
        release: movie.release,
        description: movie.description,
        producer: movie.producer?.name || null,
        director: movie.director?.fullname || null,
        genres: movie.genres,
        stars: movie.stars.map(s => s.fullname)
      }));
  
      res.status(200).json(formattedMovies);
    } catch (error) {
      res.status(500).json({
        error: {
          status: 500,
          message: "Error fetching movies",
          details: error.message
        }
      });
    }
  };
  
  exports.getMoviesByStar = async (req, res) => {
    const { starId } = req.params;
  
    try {
      // Check if the star exists
      const starExists = await Star.findById(starId);
      if (!starExists) {
        return res.status(404).json({
          error: {
            status: 404,
            message: "This movie star does not exist"
          }
        });
      }
  
      // Find all movies where the starId is in the 'stars' array
      const movies = await Movie.find({ stars: starId })
        .populate('producer', 'name')
        .populate('director')
        .populate('stars');
  
      // Format the movies to match required output
      const formattedMovies = movies.map(movie => ({
        _id: movie._id,
        title: movie.title,
        release: movie.release,
        description: movie.description,
        producer: movie.producer?.name || null,
        director: movie.director?.fullname || null,
        genres: movie.genres,
        stars: movie.stars.map(star => star.fullname)
      }));
  
      res.status(200).json(formattedMovies);
    } catch (error) {
      res.status(500).json({
        error: {
          status: 500,
          message: "Error retrieving movies by star",
          details: error.message
        }
      });
    }
  };

  exports.countMoviesByDirector = async (req, res) => {
    const { directorName } = req.params;
  
    try {
      // Find the director by name
      const director = await Director.findOne({ fullname: directorName });
  
      if (!director) {
        return res.status(404).json({
          error: {
            status: 404,
            message: "This director name does not exist"
          }
        });
      }
  
      // Count movies by director's ObjectId
      const count = await Movie.countDocuments({ director: director._id });
  
      res.status(200).json({
        director: director.fullname,
        numberOfMovies: count
      });
    } catch (error) {
      res.status(500).json({
        error: {
          status: 500,
          message: "Error counting movies by director",
          details: error.message
        }
      });
    }
  };