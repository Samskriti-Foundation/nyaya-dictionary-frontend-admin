import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from './user';

function PrivateRoutes() {
  let user = getCurrentUser()
  
  return (
    user ? <Outlet /> : <Navigate to="/"/>
  );
}

export default PrivateRoutes;