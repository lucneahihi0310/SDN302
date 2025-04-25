const express = require('express');
const router = express.Router();
const {listAllProjects, createProject} = require('../controllers/project.controller');

const timlog = (req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
}
router.use(timlog);
router.use(express.json());

router.get('/', listAllProjects);
router.post('/', createProject);


module.exports = router;