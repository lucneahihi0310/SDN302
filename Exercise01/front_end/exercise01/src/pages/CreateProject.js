import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    type: '',
    department: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await api.get('/employees');
      const unique = {};
      res.data.data.forEach(emp => {
        if (emp.department?._id && emp.department?.name) {
          unique[emp.department._id] = emp.department.name;
        }
      });
      setDepartments(Object.entries(unique));
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/projects', formData);
    navigate('/');
  };

  return (
    <div>
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} required />
        <input name="startDate" type="date" onChange={handleChange} required />
        <input name="type" placeholder="Type" onChange={handleChange} required />
        <select name="department" onChange={handleChange} required>
          <option value="">Select Department</option>
          {departments.map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateProject;
