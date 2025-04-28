const express = require('express');
const router = express.Router();
const {listAllProjects, createProject, getProjectById} = require('../controllers/project.controller');
const middleware = require('../middleware/auth.middleware');
const timlog = (req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
}
router.use(timlog);
router.use(express.json());

router.get('/', listAllProjects);
router.get('/:id', middleware ,getProjectById);
router.post('/',middleware ,createProject);


module.exports = router;