import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addProductApi, updateProductApi } from "../Data/Services/Oneforall";
import "../styles.admin/product.addproduct.css";
import AdminNav from "./AdminNav";
import Productnav from "./Product.nav";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";

const Updateproduct = () => {
  //-------------------------statess----------------------------------

  const history = useHistory();

  const {
    productName,
    collectionName,
    price,
    weight,
    purity,
    category,
    availableStatus,
    productImage,
    id,
  } = useSelector((state) => state.updateproductReducer);

  const [product, setProduct] = useState({
    productName: productName,
    collectionName: collectionName,
    price: price,
    weight: weight,
    purity: purity,
    category: category,
  });

  const [Img, setImg] = useState({
    productImage: productImage,
  });

  const [status, setStatus] = useState({
    availableStatus: availableStatus,
  });

  //-------------------------function----------------------------------

  const token = useSelector((state) => state.adminReducer).token;

  const referesh = (e) => {
    e.preventDefault();
  };

  const takeInput = (e) => {
    // console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;

    setProduct({ ...product, [name]: value });
  };

  const takeImg = (e) => {
    setImg({ productImage: e.target.files });
  };

  const takeStatus = (e) => {
    const checkTrue = e.target.checked;

    setStatus({ availableStatus: checkTrue });
  };

  const updatepoductbtn = async () => {
    // console.log("new data :", product, Img, status);

    try {
      const { productName, collectionName, price, weight, purity, category } =
        product;
      const { productImage } = Img;

      if (productImage === "") {
        return toast.dark("please enter images", { position: "bottom-right" });
      }

      const { availableStatus } = status;
      const data = {
        productName,
        collectionName,
        price,
        weight,
        purity,
        category,
        productImage,
        availableStatus,
      };
      // console.log("data: ", data);

      const form = new FormData();

      form.append("productName", productName);
      form.append("collectionName", collectionName);
      form.append("price", price);
      form.append("weight", weight);
      form.append("purity", purity);
      form.append("category", category);
      form.append("availableStatus", availableStatus);

      for (const key of Object.keys(productImage)) {
        form.append("productImage", productImage[key]);
      }

      const url = `https://rohit-goldapp-backend.herokuapp.com/updateproduct/${id}`;

      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const result = await updateProductApi(url, form, headers);
      // console.log("response: ", result);

      if (result.data.success) {
        toast.success("product updated ", {
          position: "bottom-right",
        });
        history.push("/adminpannel/products/allProduct");
      } else {
        toast.error(" something went wrong", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      // console.log("error: ", error);
      toast.error("something went wrong ", { position: "bottom-right" });
    }
  };

  return (
    <>
      {/* <AdminNav /> */}
      <Productnav />
      <div className="product-category">
        <span></span>
        <h2>Update product</h2>
        <span></span>
      </div>
      <div className="addproduct-content">
        <form onSubmit={referesh} id="myform">
          <div className="addproduct-form">
            <div className="flex1">
              <h4>
                Product :
                <input
                  type="text"
                  name="productName"
                  value={product.productName}
                  onChange={takeInput}
                />
              </h4>
              <h4>
                Collection :
                <input
                  type="text"
                  name="collectionName"
                  value={product.collectionName}
                  onChange={takeInput}
                />
              </h4>

              <h4>
                Availability Status :
                <label className="switch">
                  <input
                    type="checkbox"
                    name="availableStatus"
                    checked={status.availableStatus}
                    onChange={takeStatus}
                  />
                  <span className="slider" />
                </label>
              </h4>
            </div>

            <div className="flex2">
              <h4>
                Category :
                <input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={takeInput}
                />
              </h4>
              <h4>
                Price :
                <input
                  type="text"
                  name="price"
                  value={product.price}
                  onChange={takeInput}
                />
              </h4>
              <h4>
                Weight :
                <input
                  type="text"
                  name="weight"
                  value={product.weight}
                  onChange={takeInput}
                />
              </h4>
              <h4>
                Purity :
                <input
                  type="text"
                  name="purity"
                  value={product.purity}
                  onChange={takeInput}
                />
              </h4>
            </div>

            <div className="flex3">
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <h3>Image file:</h3>
                <p style={{ marginLeft: "10px" }}>only 4 files</p>
              </div>
              <input
                type="file"
                multiple
                name="productImage"
                onChange={takeImg}
              />
              <br />
              <button title="add" className="add" onClick={updatepoductbtn}>
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Updateproduct;
