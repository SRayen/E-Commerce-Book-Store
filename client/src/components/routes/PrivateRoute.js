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
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/auth-check`,
        {
          headers: { Authorization: auth?.token },
        }
      );
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    authCheck()
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loading />;
};

export default PrivateRoute;