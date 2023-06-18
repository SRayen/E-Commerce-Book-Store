import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";


  const PrivateRoute = () => {
    const [auth, setAuth] = useAuth();
    //state
    const [ok, setOk] = useState();
    useEffect(() => {
      if (auth?.token) {
        setOk(true);
      } else {
        setOk(false);
      }
    }, [auth?.token]);
    return ok ? <Outlet /> : <Loading/>;
  };

export default PrivateRoute;
