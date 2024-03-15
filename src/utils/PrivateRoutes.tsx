import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
  let user: boolean = true;
  return (
    user ? <Outlet /> : <Navigate to="/"/>
  );
}

export default PrivateRoutes;