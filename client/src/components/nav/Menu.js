import React from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Menu = () => {
  const navigate = useNavigate();
  //hook
  const [auth, setAuth] = useAuth();

  const logout = () => {
    setAuth({ ...auth, token: "", user: null });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2">
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/">
            HOME
          </NavLink>
        </li>
        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                REGISTER
              </NavLink>
            </li>
          </>
        ) : (
          <li className="nav-item pointer">
            <a className="nav-link" onClick={logout}>
              LOGOUT
            </a>
          </li>
        )}
      </ul>
    </>
  );
};

export default Menu;
