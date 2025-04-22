import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await api.get('/projects');
      setProjects(res.data.data);
    };
    fetchProjects();
  }, []);

//   return (
//     <div>
//       <h1>Project List</h1>
//       <Link to="/create">+ Create New Project</Link>
//       <ul>
//         {projects.map(project => (
//           <li key={project.id}>
//             <Link to={`/department/${project.departmentId}`}>
//               <strong>{project.name}</strong> - {project.description} <br />
//               Dept: {project.departmentName || 'N/A'}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

return (
    <div className="container py-4">
      <h1 className="text-center mb-4">List Of Project</h1>
      <Link to="/create" className="btn btn-primary mb-3">
        Add new project
      </Link>
  
      <table className="table table-striped table-hover table-bordered">
        <thead className="table-info">
          <tr>
            <th>ID</th>
            <th>Project Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>Type</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>
            <Link to={`/department/${project.departmentId}`}>{project.name}</Link>
              </td>
              <td>{project.description}</td>
              <td>{new Date(project.startDate).toLocaleDateString()}</td>
              <td>{project.type}</td>
              <td>{project.departmentName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
