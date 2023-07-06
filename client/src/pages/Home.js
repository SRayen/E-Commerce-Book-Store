import React, { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import moment from "moment";
import ProductCard from "../components/cards/ProductCard";
import loadIcon from "../images/loading.gif";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/products-count");
      setTotal(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const arr = [...products];
  const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));
  return (
    <div className="mx-1">
      <Jumbotron title="Hello" />

      <div className="row">
        <div className="col-md-6">
          <h2 className="p-3 mt-2 mb-2 h4 bg-dark text-center text-info rounded-5">
            New Arrivals
          </h2>

          {true ? (
            <img src={loadIcon} alt="loading" style={{width:'100%'}} />
          ) : (
            <div className="row">
              {products?.map((p) => (
                <div className="col-md-6" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-md-6">
          <h2 className="p-3 mt-2 mb-2 h4 bg-dark text-center text-danger rounded-5">
            Best Sellers
          </h2>

          {loading ? (
            <img src={loadIcon} alt="loading" style={{width:'100%'}} />
          ) : (
            <div className="row">
              {sortedBySold?.map((p) => (
                <div className="col-md-6" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="container text-center p-5 ">
        {products && products.length < total && (
          <button
            className="btn btn-warning btn-lg col-md-6"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
