import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingGIF from "../../images/loading.gif";

const Loading = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //state:used in taking user to intended page after login !
    count === 0 && navigate("/login", { state: location.pathname });
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
