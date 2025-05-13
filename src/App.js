import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login'
import Signin from './Components/Signin';
import ChatBox from './Components/ChatBox';
import TeacherChatBox from './Components/TeacherChatBox';
import ProtectedRoute from './Components/ProtectedRoute';
import TeacherDashboard from './RoleComponents/TeacherDashboard';
import AssignmentForge from './DashboardComponent/AssignmentForge';
import AssignmentDetail from './DashboardComponent/AssignmentDetail';
import AssignmentList from './DashboardComponent/AssignmentList';
import TeacherHome from './Components/TeacherHome';
import AdminAssignPage from './RoleComponents/AdminAssignPage';
import TeacherAssignments from './DashboardComponent/TeacherAssignment';
import AssignmentSubmissions from './DashboardComponent/AssignmentSubmission';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/student" element={<Home />} />
        <Route path="/teacher" element={<TeacherHome />} />
        <Route path="/chatbox" element={<ChatBox />} />
        <Route path="/teacher/chatbox" element={<TeacherChatBox />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard/>}/>
        <Route path="/teacher/assignment" element={<TeacherAssignments/>}/>
        <Route path="/assignments/:assignmentId/submissions" element={<AssignmentSubmissions/>}/>
        <Route path="/assignment/forge" element={<AssignmentForge/>} />
        <Route path="/student/assignments" element={<AssignmentList/>} />
        <Route path="/student/assignment/:id" element={<AssignmentDetail/>}/>
        <Route path="/admin/assigning/role" element={<AdminAssignPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
