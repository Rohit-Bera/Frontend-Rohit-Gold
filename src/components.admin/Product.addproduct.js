import React, { useState } from "react";
import { toast } from "react-toastify";
import { addProductApi } from "../Data/Services/Oneforall";
import "../styles.admin/product.addproduct.css";
import AdminNav from "./AdminNav";
import Productnav from "./Product.nav";

import Loader from "react-loader-spinner";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Productaddproduct = () => {
  //-------------------------statess----------------------------------
  //all product state
  //product detail state
  const [loader, setLoader] = useState(false); // loaders state

  const [product, setProduct] = useState({
    productName: "",
    collectionName: "",
    price: null,
    weight: "",
    purity: "",
    category: "",
  });
  //product image state
  const [Img, setImg] = useState({
    productImage: "",
  });

  //availablestatus
  const [status, setStatus] = useState({
    availableStatus: false,
  });

  //admin token
  const token = useSelector((state) => state.adminReducer).token;

  //-------------------------functions----------------------------------
  const referesh = (e) => {
    e.preventDefault();
  };

  //takes product detail
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

  //addproduct
  const addProduct = async () => {
    setLoader(true);

    try {
      // console.log("product :", product);
      // console.log("img : ", Img);
      // console.log("sttaus :", status);

      const { productName, collectionName, price, weight, purity, category } =
        product;
      const { productImage } = Img;
      // console.log("productImage: ", productImage);

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
      if (
        productName === "" ||
        collectionName === "" ||
        price === "" ||
        weight === "" ||
        purity === "" ||
        category === "" ||
        productImage === ""
      ) {
        setLoader(false);
        return toast.error("please enter complete details", {
          position: "top-right",
        });
      }

      const fd = new FormData();

      fd.append("productName", productName);
      fd.append("collectionName", collectionName);
      fd.append("price", price);
      fd.append("weight", weight);
      fd.append("purity", purity);
      fd.append("category", category);
      fd.append("availableStatus", availableStatus);

      for (const key of Object.keys(productImage)) {
        fd.append("productImage", productImage[key]);
      }

      // console.log(fd);

      const url = "http://localhost:5800/addProduct";
      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const result = await addProductApi(url, fd, headers);
      // console.log("result: ", result);

      if (result.data.success) {
        toast.success("product added 👍", {
          position: "bottom-right",
        });
        setLoader(false);
      } else {
        toast.error(" something went wrong 👎 ", {
          position: "bottom-right",
        });
        setLoader(false);
      }

      //refersh
      document.getElementById("myform").reset();
      // window.location.reload();
      document.location.reload();

      setStatus({ availableStatus: false });
      setProduct({
        productName: "",
        collectionName: "",
        price: null,
        weight: "",
        purity: "",
        category: "",
      });
    } catch (error) {
      // console.log("error: ", error);
      toast.error(" something went wrong  ", {
        position: "bottom-right",
      });
      setLoader(false);
    }
  };

  // console.log("availableStatus after: ", status.availableStatus);

  return (
    <>
      {/* <AdminNav /> */}
      <Productnav />

      <div className="product-category">
        <span></span>
        <h2>Add product</h2>
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
                    checked={product.availableStatus}
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
              <button title="add" className="add" onClick={addProduct}>
                <i class="fas fa-plus"></i>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // marginTop: "170px",
                  }}
                >
                  {loader ? (
                    <Loader
                      type="ThreeDots"
                      color="crimson"
                      height={80}
                      width={80}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Productaddproduct;
