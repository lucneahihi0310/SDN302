import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DepartmentEmployees from './pages/DepartmentEmployees';
import CreateProject from './pages/CreateProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/department/:departmentId" element={<DepartmentEmployees />} />
        <Route path="/create" element={<CreateProject />} />
      </Routes>
    </Router>
  );
}

export default App;
