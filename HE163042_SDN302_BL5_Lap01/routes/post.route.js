const express = require('express');
const router = express.Router();
const { getAllPosts, getPostById, getAllTags, getLikeDescanding } = require('../controllers/post.controller');
const timlog = (req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
}

router.use(timlog);
router.use(express.json());
router.get('/', getAllPosts);
router.get('/all-tags', getAllTags);
router.get('/top/:n', getLikeDescanding);
router.get('/:postId', getPostById);
module.exports = router;