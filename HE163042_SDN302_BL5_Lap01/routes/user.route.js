const express = require('express');
const router = express.Router();
const { getPostByName } = require('../controllers/user.controller');
const timlog = (req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
}

router.use(timlog);
router.use(express.json());
// router.get('/:userId/posts', getPostByName);
router.get('/:firstName/posts', getPostByName);
module.exports = router;