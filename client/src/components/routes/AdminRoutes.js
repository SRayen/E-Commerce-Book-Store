import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";

const AdminRoute = () => {
  const [auth, setAuth] = useAuth();
  //state
  const [ok, setOk] = useState();

  useEffect(() => {
    const adminCheck = async () => {
      const { data } = await axios.get(`/admin-check`);
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) adminCheck();
  }, [auth?.token]);
  //   path=""===> Home page  //    <Loading path="" /> ==> case user in not admin
  return ok ? <Outlet /> : <Loading path="" />;
};

export default AdminRoute;
