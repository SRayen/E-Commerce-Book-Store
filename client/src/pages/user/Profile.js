import React, { useState } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";

const UserProfile = () => {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Dashboard"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
           <UserMenu/>
          </div>
          <div className="col-md-9">
            <div className="p-3 pt-2 mb-2 h4 bg-light">Profile</div>
                update form ...
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
