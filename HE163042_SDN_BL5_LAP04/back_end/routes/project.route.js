const express = require('express');
const router = express.Router();
const {listAllProjects, createProject} = require('../controllers/project.controller');
const middleware = require('../middleware/auth.middleware');
const timlog = (req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
}
router.use(timlog);
router.use(express.json());

router.get('/', listAllProjects);
router.post('/',middleware ,createProject);


module.exports = router;