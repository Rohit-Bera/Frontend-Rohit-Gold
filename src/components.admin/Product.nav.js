import React from "react";
import "../styles.admin/product.nav.css";
import { NavLink, Link } from "react-router-dom";

const Productnav = () => {
  return (
    <>
      <div className="product-nav">
        <nav>
          <div>
            <NavLink
              exact
              activeClassName="active"
              to="/adminpannel/products/allProduct"
            >
              <h3>Products</h3>
            </NavLink>
            <NavLink
              exact
              activeClassName="active"
              to="/adminpannel/products/collection"
            >
              <h3>Collections</h3>
            </NavLink>
            <NavLink
              exact
              activeClassName="active"
              to="/adminpannel/products/addProduct"
            >
              <h3>Add Product</h3>
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Productnav;
