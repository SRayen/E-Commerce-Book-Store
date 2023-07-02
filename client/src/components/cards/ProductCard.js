import React from "react";
import moment from "moment";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import { toast } from "react-hot-toast";

const ProductCard = ({ p }) => {
  //context
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  //save actual cart in local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  return (
    <div className="card mb-3 hoverable card-perso w-auto" >
      <Badge.Ribbon text={`${p?.sold} sold`} color="volcano">
        <Badge.Ribbon
          text={`${
            p?.quantity > 0 ? `${p?.quantity - p?.sold} in stock` : "Out of stock"
          }`}
          placement="start"
          color={`${p?.quantity === 0 ? "red" : "green"}`}
        >
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
            style={{ height: "300px" }}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>

      <div className="card-body card-perso-body">
        <h5>{p?.name}</h5>
        <div className="fw-bold">
          {p?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
        <h5>{p?.description?.substring(0, 60)}...</h5>
      </div>
      <div className="d-flex flex-column flex-md-row">
        <button
          className="btn btn-primary col card-button mb-2 mb-md-0"
          onClick={() => navigate(`/product/${p.slug}`)}
        >
          View Product
        </button>
        <button
          className="btn btn-outline-primary col card-button"
          onClick={() => {
            setCart([...cart, p]);
            toast.success("Added to cart");
          }}
        >
          Add to cart
        </button>
      </div>

      {/* <p>{moment(p.createdAt).fromNow()}</p>
      <p>{p.sold} sold</p> */}
    </div>
  );
};

export default ProductCard;
