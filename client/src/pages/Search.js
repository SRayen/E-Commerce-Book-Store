import React from "react";
import { useSearch } from "../context/Search";
import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <>
      <Jumbotron
        title="Search results"
        subtitle={
          values?.results?.length < 1
            ? "No products found"
            : `Found ${values?.results?.length} products`
        }
      />
      <div className="container mt-3">
        <div className="row">
          {values?.results?.map((p) => (
            <div key={p._id} className="col-md-4">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
