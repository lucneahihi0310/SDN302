const Employee = require('../models/employee.model');

exports.listAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
exports.listAllEmployeeByDepartmentId = async (req, res) => {
    try {
        const { dept } = req.params;
        if (!dept) {
            return res.status(400).json({ success: false, message: "Department ID is required" });
        }
        const formatDate = (date) => {
            const d = new Date(date);
            const day = d.getDate().toString().padStart(2, '0');  // Đảm bảo ngày có 2 chữ số
            const month = (d.getMonth() + 1).toString().padStart(2, '0');  // Đảm bảo tháng có 2 chữ số
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
        };
        const employees = await Employee.find({ department: dept });
        const employeeFormatted = employees.map(employee => ({
            id: employee._id,
            name: employee.name,
            dob: formatDate(employee.dob),
            gender: employee.gender,
            position: employee.position
        }));
        res.status(200).json(employeeFormatted);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};