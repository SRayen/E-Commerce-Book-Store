import React, { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/cards/ProductCard";


const CategoryView = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProductsByCategory();
  }, [params?.slug]);
  const loadProductsByCategory = async () => {
    const { data } = await axios.get(`/products-by-category/${params.slug}`);
    setCategory(data.category);
    setProducts(data.products);
  };

  return (
    <>
      <Jumbotron
        title={category?.name}
        subtitle={`${products?.length} products found in "${category?.name}"`}
      />
      <div className="container-fluid">
        <div className="row mt-3">
            {products?.map((p)=>(
                <div className="col-md-4">
                    <ProductCard p={p}/>
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CategoryView;
