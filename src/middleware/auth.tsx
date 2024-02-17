import { Navigate, Outlet } from "react-router-dom";

const Checkauth = () => {
  const isLoggedIn = localStorage.getItem("token");
  if (isLoggedIn === "true") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Checkauth;
