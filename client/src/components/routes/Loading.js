import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingGIF from "../../images/loading.gif";

const Loading = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate("/login");
    //cleanup
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      {/* Redirecting you in {count} seconds */}
      <img src={LoadingGIF} alt="Loading" style={{ width: "500px" }} />
    </div>
  );
};

export default Loading;
