import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PricateRouter = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PricateRouter;
