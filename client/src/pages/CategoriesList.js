import React from "react";
import useCategory from "../hooks/useCategory";
import Jumbotron from "../components/cards/Jumbotron";
import { Link } from "react-router-dom";

const CategoriesList = () => {
  const categories = useCategory();
  return (
    <>
      <Jumbotron title="Categories" subtitle="List of all categories" />
      <div className="container">
        <div className="row gx-5 gy-5 mt-3 mb-5">
          {categories.map((c) => (
            <div className="col-md-6" key={c._id}>
              <button className="btn btn-light col-12 text-dark p-3">
                <Link
                  to={`/category/${c.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  {c.name}
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesList;
