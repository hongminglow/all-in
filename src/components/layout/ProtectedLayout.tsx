import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router";
import { ROUTES } from "~/constant/route";

export const ProtectedLayout = () => {
  const token = Cookies.get("token");

  if (!token) return <Navigate to={ROUTES.LOGIN} replace />;

  return <Outlet />;
};
