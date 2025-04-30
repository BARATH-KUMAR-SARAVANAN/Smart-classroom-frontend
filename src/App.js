import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signin from './Components/Signin';
import ChatBox from './Components/ChatBox';
import TeacherDashboard from './RoleComponents/TeacherDashboard';
import AssignmentForge from './DashboardComponent/AssignmentForge';
import AssignmentDetail from './DashboardComponent/AssignmentDetail';
import AssignmentList from './DashboardComponent/AssignmentList';
import TeacherHome from './Components/TeacherHome';

function App() {
  return (
    <Routes>
      <Route path="/student" element={<Home />} />
      <Route path="/teacher" element={<TeacherHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/chatbox" element={<ChatBox />} />
      <Route path="/teacher/dashboard" element={<TeacherDashboard/>}/>
      <Route path="/assignment/forge" element={<AssignmentForge/>} />
      <Route path="/student/assignments" element={<AssignmentList/>} />
      <Route path="/student/assignment/:id" element={<AssignmentDetail/>}/>
      
    </Routes>
  );
}

export default App;
