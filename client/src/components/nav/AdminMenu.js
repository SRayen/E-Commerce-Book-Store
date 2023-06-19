import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="p-3 pt-2 mb-2 h4 bg-light">Admin Links</div>
      <ul className="list-group list-unstyled">
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/category">
            Create category
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/product">
            Create product
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default AdminMenu;
