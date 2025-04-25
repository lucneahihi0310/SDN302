const Department = require('../models/department.model');

exports.listAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json({ success: true, data: departments });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};