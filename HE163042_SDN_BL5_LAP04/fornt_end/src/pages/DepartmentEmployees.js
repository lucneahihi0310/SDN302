import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { Link } from 'react-router-dom';

const DepartmentEmployees = () => {
  const { departmentId } = useParams();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await api.get(`/employees/${departmentId}`);
      setEmployees(res.data);
    };
    fetchEmployees();
  }, [departmentId]);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">List Of Employee</h1>
  
      <Link to="/" className="btn btn-secondary mb-3">
        Home Page
      </Link>
  
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-info">
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Date Of Birth</th>
              <th>Gender</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.dob}</td>
                <td>{employee.gender}</td>
                <td>{employee.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DepartmentEmployees;
