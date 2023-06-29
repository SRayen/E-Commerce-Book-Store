import React from "react";
import moment from "moment";
import { useCart } from "../../context/cart";

const ProductCardHorizontal = ({ p, remove = true }) => {
  const [cart, setCart] = useCart();

  const removeFromCart = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  return (
    <div
      className="card mb-3"
      style={{ width: "100%", backgroundColor: "#CFF4D2" }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
            style={{
              height: "150px",
              width: "150px",

              marginLeft: "-12px",
              borderTopRightRadius: "0px",
            }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              {p.name}{" "}
              {p?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h5>
            <p className="card-text">
              {`${p?.description?.substring(0, 50)}...`}
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <p className="card-text">
            <small className="text-muted">
              Listed {moment(p.createdAt).fromNow()}
            </small>
          </p>
          {remove && (
            <p
              className="btn btn-sm btn-outline-danger mb-2"
              onClick={() => removeFromCart(p._id)}
            >
              Remove
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardHorizontal;
