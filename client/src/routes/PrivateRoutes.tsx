import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const userSession = sessionStorage.getItem("userSession");
  if (userSession) {
    const { token } = JSON.parse(userSession);
    if (token) {
      return <Outlet />;
    }
  }

  return <Navigate to="/login" />;
};
export default PrivateRoutes;
