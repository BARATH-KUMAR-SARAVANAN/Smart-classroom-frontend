import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signin from './Components/Signin';
import TeacherDashboard from './RoleComponents/TeacherDashboard';
import AssignmentForge from './DashboardComponent/AssignmentForge';
import AssignmentDetail from './DashboardComponent/AssignmentDetail';
import AssignmentList from './DashboardComponent/AssignmentList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<TeacherDashboard/>}/>
      <Route path="/forge" element={<AssignmentForge/>} />
      <Route path="/assignments" element={<AssignmentList/>} />
      <Route path="/student/assignment/:id" element={<AssignmentDetail/>}/>
      
    </Routes>
  );
}

export default App;
