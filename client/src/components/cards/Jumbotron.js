import React from "react";

const Jumbotron = ({ title, subtitle = "Welcome To React E-Commerce" }) => {
  return (
    <div className="container-fluid jumbotron">
      <div className="col text-center p-5">
        <h1 className="fw-bold">{title}</h1>
        <p className="lead">{subtitle}</p>
      </div>
    </div>
  );
};

export default Jumbotron;
