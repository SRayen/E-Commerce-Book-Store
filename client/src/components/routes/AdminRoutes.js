import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";
import { toast } from "react-hot-toast";

const AdminRoute = () => {
  const [auth, setAuth] = useAuth();
  //state
  const [ok, setOk] = useState();

  useEffect(() => {
    const adminCheck = async () => {
      try {
        const { data } = await axios.get(`/admin-check`);
        if (data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log(error)
      }
    };
    if (auth?.token) adminCheck();
  }, [auth?.token]);
  //   path=""===> Home page  //    <Loading path="" /> ==> case user in not admin
  return ok ? <Outlet /> : <Loading path="" />;
};

export default AdminRoute;
