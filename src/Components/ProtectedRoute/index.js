import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const userInfo = localStorage.getItem('userInfo');
  
  // Check if userInfo exists and has an access_token
  const access_token = userInfo ? JSON.parse(userInfo).access_token : null;

  return access_token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
