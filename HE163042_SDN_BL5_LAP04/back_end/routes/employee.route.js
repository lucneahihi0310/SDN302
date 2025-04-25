const express = require('express');
const router = express.Router();
const {listAllEmployees, listAllEmployeeByDepartmentId} = require('../controllers/employee.controller');

const timlog = (req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
}
router.use(timlog);
router.use(express.json());

router.get('/', listAllEmployees);
router.get('/:dept', listAllEmployeeByDepartmentId);

module.exports = router;