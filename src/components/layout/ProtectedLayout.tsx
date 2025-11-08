import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router";
import { ROUTES } from "~/constant/route";
import { usePlayMusic } from "~/hooks/usePlayMusic";

export const ProtectedLayout = () => {
  // Play lobby BGM
  usePlayMusic(true);

  const token = Cookies.get("token");

  if (!token) return <Navigate to={ROUTES.LOGIN} replace />;

  return <Outlet />;
};
