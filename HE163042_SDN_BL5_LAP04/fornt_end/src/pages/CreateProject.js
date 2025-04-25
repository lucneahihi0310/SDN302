import React, { useState, useEffect } from "react";
import api from '../api/api';
import { Link } from "react-router-dom";

const AddProject = () => {
  const [departments, setDepartments] = useState([]);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    type: "",
    department: "",
  });

  // Fetch departments from the server
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/departments");
        console.log("DEPARTMENTS RESPONSE:", response.data)
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (
      !projectData.name ||
      !projectData.description ||
      !projectData.startDate ||
      !projectData.type ||
      !projectData.department
    ) {
      alert("Please enter the form fields that are required");
      return;
    }

    try {
      const response = await api.post("/projects", projectData);
      console.log("Project created successfully", response.data);
      alert("Created Successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Add New Project</h1>

      <Link to="/" className="btn btn-secondary mb-3">
        Home Page
      </Link>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Project Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={projectData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={projectData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            value={projectData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Project Type
          </label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            value={projectData.type}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="department" className="form-label">
            Department
          </label>
          <select
            className="form-select"
            id="department"
            name="department"
            value={projectData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddProject;
