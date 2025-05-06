import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {
  const userInfo = localStorage.getItem('userInfo');
  const access_token = JSON.parse(userInfo).access_token
  return access_token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
