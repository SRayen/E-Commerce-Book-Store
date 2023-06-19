import React, { useState } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";

const AdminCategory = () => {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Admin Dashboard"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 pt-2 mb-2 h4 bg-light">Manage Categories</div>
                <p>Create category form ...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
