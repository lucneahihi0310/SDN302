const Projects = require("../models/project.model");

exports.listAllProjects = async (req, res) => {
    try {
        const projects = await Projects.find().populate('department', 'name');
        const formattedProjects = projects.map(project => ({
            id: project._id,
            name: project.name,
            description: project.description,
            startDate: project.startDate,
            type: project.type,
            departmentId: project.department?._id || null,
            departmentName: project.department?.name || null
        }));
        res.status(200).json({ success: true, data: formattedProjects });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
exports.createProject = async (req, res) => {
    try {
        const { name, description, startDate, type, department } = req.body;

        if (!name || !description || !startDate || !type || !department) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newProject = new Projects({
            name,
            description,
            startDate,
            type,
            department
        });

        const savedProject = await newProject.save();

        res.status(201).json({
            success: true,
            data: {
                id: savedProject._id,
                name: savedProject.name,
                description: savedProject.description,
                startDate: savedProject.startDate,
                type: savedProject.type,
                department: savedProject.department,
                createdAt: savedProject.createdAt,
                updatedAt: savedProject.updatedAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};