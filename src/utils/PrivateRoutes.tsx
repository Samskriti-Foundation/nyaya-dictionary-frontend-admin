import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
  let user: boolean = localStorage.getItem('token') ? true : false;
  return (
    user ? <Outlet /> : <Navigate to="/"/>
  );
}

export default PrivateRoutes;