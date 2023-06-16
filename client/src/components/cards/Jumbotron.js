import React from "react";

const Jumbotron = ({ title, subtitle = "Welcome To React E-Commerce" }) => {
  return (
    <div className="container-fluid bg-primary">
      <div className="col text-center p-5 bg-light">
        <h1>{title}</h1>
        <p className="lead">{subtitle}</p>
      </div>
    </div>
  );
};

export default Jumbotron;
