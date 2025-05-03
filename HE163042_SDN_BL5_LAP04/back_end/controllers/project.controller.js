const Projects = require("../models/project.model");
const Department = require("../models/department.model");

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
        res.status(200).json(formattedProjects);
    } catch (error) {
        // res.status(500).json({ success: false, message: "Server Error" });
        error = new Error("Server Error");
        error.status = 500;
        next(error);
    }
};
exports.createProject = async (req, res) => {
    try {
        const { name, description, startDate, type, department } = req.body;

        if (!name || !description || !startDate || !type || !department) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        // Check if department exists
        const foundDepartment = await Department.findById(department);
        if (!foundDepartment) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }
       
        const newProject = new Projects({
            name,
            description,
            startDate,
            type,
            department
        });

        const savedProject = await newProject.save();
        const populatedProject = await Projects.findById(savedProject._id);
        res.status(201).json(populatedProject);
        // res.status(201).json({
        //     success: true,
        //     data: {
        //         id: savedProject._id,
        //         name: savedProject.name,
        //         description: savedProject.description,
        //         startDate: savedProject.startDate,
        //         type: savedProject.type,
        //         department: savedProject.department,
        //         createdAt: savedProject.createdAt,
        //         updatedAt: savedProject.updatedAt
        //     }
        // });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Projects.findById(req.params.id).populate('department', 'name');
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};  