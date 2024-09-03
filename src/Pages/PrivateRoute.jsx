import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";


export default function PrivateRoute() {
  const {isAutententicated, loading} = useAuth();

  //console.log(loading,isAutententicated)  
  if (loading) return "loading"

  return isAutententicated  ? <Outlet /> : <Navigate to="/login" />;
}