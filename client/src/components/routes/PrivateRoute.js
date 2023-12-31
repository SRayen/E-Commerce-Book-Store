import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";

const PrivateRoute = () => {
  const [auth, setAuth] = useAuth();
  //state
  const [ok, setOk] = useState();

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(`/auth-check`);
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
{/* <Loading path="user" /> ==> case: user not logged in */}
  return ok ? <Outlet /> : <Loading path="user" />;
};

export default PrivateRoute;
