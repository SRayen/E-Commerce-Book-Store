import React from "react";

const Jumbotron = ({
  title,
  subtitle = "Welcome to Rayen's Bookstore",
}) => {
  return (
    <div
      className="container-fluid jumbotron"
      style={{ marginTop: "-8px", height: "200px" }}
    >
      <div className="col text-center p-4">
        <h1 className="fw-bold">{title}</h1>
        <div className="content">
          <h2 >{subtitle}</h2>
          <h2 >{subtitle}</h2>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
