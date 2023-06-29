import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-hot-toast";

const UserCartSidebar = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getClientToken();
  }, [auth?.token]);

  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const cartTotal = (productId) => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
      console.log("tot", total);
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleBuy = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="col-md-4 mb-5">
      <h4>Your cart summary</h4>
      Total / Adress / Payments
      <hr />
      <h6>Total: {cartTotal()}</h6>
      {auth?.user?.address ? (
        <>
          <div className="mb-3">
            <hr />
            <h4>Delivery address:</h4>
            <h5>{auth?.user?.address}</h5>
          </div>
          <button
            className="btn btn-warning"
            onClick={() =>
              navigate("/dashboard/user/profile", {
                state: "/cart",
              })
            }
          >
            Update address
          </button>
        </>
      ) : (
        <div className="mb-3">
          {auth?.token ? (
            <button
              className="btn btn-outline-warning"
              onClick={() =>
                navigate("/dashboard/user/profile", {
                  state: "/cart",
                })
              }
            >
              Add delivery address
            </button>
          ) : (
            <button
              className="btn btn-outline-danger"
              onClick={() =>
                navigate("/login", {
                  state: "/cart",
                })
              }
            >
              Login to checkout
            </button>
          )}
        </div>
      )}
      <div className="mt-3">
        {!clientToken || !cart?.length ? (
          ""
        ) : (
          <>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: { flow: "vault" },
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <button
              onClick={handleBuy}
              className="btn btn-primary col-12 mt-2"
              disabled={!auth?.user?.address || !instance || loading}
            >
              {loading ? "Processing..." : "Buy"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCartSidebar;
