const express = require('express');
const router = express.Router();
const {listAllDepartments} = require('../controllers/department.controller');

const timlog = (req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
}
router.use(timlog);
router.use(express.json());

router.get('/', listAllDepartments);

module.exports = router;