import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DepartmentEmployees from './pages/DepartmentEmployees';
import CreateProject from './pages/CreateProject';
import LoginForm from './pages/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/department/:departmentId" element={<DepartmentEmployees />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
