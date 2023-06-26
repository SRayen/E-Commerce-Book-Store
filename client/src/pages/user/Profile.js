import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import axios from "axios";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { name, email, address } = auth.user;
      setName(name);
      setEmail(email);
      setAddress(address);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password.length < 6) {
      toast.error("Password should be min 6 characters long");
      return;
    }
    try {
      const { data } = await axios.put("/profile", {
        name,
        password,
        address,
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data });
        //local storage update
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile udpated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Dashboard" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 pt-2 mb-2 h4 bg-light">Profile</div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control m-2 p-2"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={true}
              />

              <input
                type="email"
                className="form-control m-2 p-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus={true}
                disabled={true}
              />

              <input
                type="password"
                className="form-control m-2 p-2"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                autoFocus={true}
              />

              <textarea
                className="form-control m-2 p-2"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoFocus={true}
              />
              <button className="btn btn-primary m-2 p-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
