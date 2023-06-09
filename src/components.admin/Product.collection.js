import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import "../styles.admin/product.collection.css";
import rosegold from "../Images/rose-gold-collection.jpg";
import Productnav from "./Product.nav";
import {
  getCollectionApi,
  postCollectionApi,
  deleteCollectionApi,
} from "../Data/Services/Oneforall";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "react-loader-spinner";

const Productcollection = () => {
  const [collection, setCollection] = useState([]); //get state

  const [loader, setLoader] = useState(false); // loaders state

  const [checkNull, setNull] = useState(false); //null state

  //input
  const [Input, setInput] = useState({
    nameofCollection: "",
  });
  //image
  const [Img, setImg] = useState({
    imgofCollection: "",
  });
  //token dispatch
  const token = useSelector((state) => state.adminReducer).token;

  // image , input state for delete purpose
  const [data, setData] = useState({
    imgofCollection: "",
    nameofCollection: "",
  });

  useEffect(() => {
    getCollection();
  }, []);

  const getCollection = async () => {
    setLoader(true);
    try {
      const url = "https://goldapp-backend-server.onrender.com/getCollection";

      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const response = await getCollectionApi(url, headers);
      // console.log("response :", response.data.collections);

      setCollection(response.data.collections);

      if (response) {
        setLoader(false);
      } else {
        setLoader(false);
      }

      if (response.data.collections.length !== 0) {
        setNull(true);
      } else {
        setNull(false);
      }
    } catch (error) {
      // console.log("error: ", error);
      setLoader(false);
    }
  };

  const takeInput = (e) => {
    // const name = e.target.name;
    // const value = e.target.value;
    // setInput({ ...Input, [name]: value });

    setInput({ nameofCollection: e.target.value });
  };

  const takeImage = (e) => {
    // console.log(e);
    // console.log(e.target);
    setImg({ imgofCollection: e.target.files[0] });
  };

  const postCollection = async () => {
    setLoader(true);

    try {
      const { nameofCollection } = Input;

      const { imgofCollection } = Img;

      setData({ imgofCollection, nameofCollection });

      const fd = new FormData();
      // console.log("fd: ", fd);

      fd.append("imgofCollection", Img.imgofCollection);
      // console.log("Img.imgofCollection: ", Img.imgofCollection);

      fd.append("nameofCollection", Input.nameofCollection);

      const url = "https://goldapp-backend-server.onrender.com/addCollection";
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      // const headers = { Authorization: `Bearer ${token}` };
      // console.log("headers: ", headers);
      const response = await postCollectionApi(url, fd, headers);

      // const response = await axios.post(
      //   "http://localhost:5800/addcollection",
      //   fd,
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
      // console.log("response add collection: ", response);

      if (response.success) {
        toast.success(" collection added 👍");
        setLoader(false);
      } else {
        toast.error("failed to add 👎 ");
        setLoader(false);
      }

      setInput({ ...Input, ["nameofCollection"]: "" });
      // setImg({ ...Img, ["imgofCollection"]: null });

      getCollection();

      document.getElementById("myform").reset();
    } catch (error) {
      // console.log("error: ", error);
      setLoader(false);

      toast.error("something went wrong");
    }
  };

  const referesh = (e) => {
    e.preventDefault();
  };

  const deleteCollection = async (item) => {
    setLoader(true);

    try {
      // console.log("item: ", item);
      const { _id, nameofCollection, imgofCollection } = item;

      const formd = new FormData();

      // console.log("data : ", data);

      console.log("data.img :", data.imgofCollection);
      // console.log("data.name :", data.nameofCollection);

      formd.append("imgofCollection", data.imgofCollection);
      formd.append("nameofCollection", data.nameofCollection);

      const url = `https://goldapp-backend-server.onrender.com/deleteCollection/${_id}`;
      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const response = await deleteCollectionApi(url, formd, headers);
      // console.log("fd: ", formd);

      // console.log("_id : ", _id);

      // const result = await axios.delete(
      //   `http://localhost:5800/deleteCollection/${_id}`,
      //   { headers: { Authorization: `Bearer ${token}` } },
      //   fd
      // );

      // console.log("response: ", response);

      if (response.success) {
        toast.success(" collection deleted 👍");
        setLoader(false);
      } else {
        toast.error("failed to delete 👎 ");
        setLoader(false);
      }

      // setInput({ ...Input, ["nameofCollection"]: "" });
      // setImg({ imgofCollection: "" });

      getCollection();

      //
    } catch (error) {
      // console.log("error: ", error);

      toast.error("something went wrong");
      setLoader(false);
    }
  };

  return (
    <>
      {/* <AdminNav /> */}
      <Productnav />

      <div className="product-category">
        <span></span>
        <h2>Product Collection</h2>
        <span></span>
      </div>

      <div className="product-container">
        <div className="addcollection-section">
          <form onSubmit={referesh} id="myform">
            <h3>Add Collection</h3>
            <h3>
              Collection name :{" "}
              <input
                type="text"
                name="nameofCollection"
                value={Input.nameofCollection}
                onChange={(e) => takeInput(e)}
              />
            </h3>
            <h3>
              Collection image :{" "}
              <input
                type="file"
                name="imgofCollection"
                onChange={(e) => takeImage(e)}
              />
            </h3>

            <button onClick={postCollection}>Add</button>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // marginTop: "170px",
              }}
            >
              {loader ? (
                <Loader type="ThreeDots" color="white" height={80} width={80} />
              ) : (
                ""
              )}
            </div>
          </form>
        </div>

        <div className="product-store">
          {checkNull ? (
            ""
          ) : (
            <div
              style={{
                color: "crimson",
                fontSize: "20px",
              }}
            >
              <h3>No orders left</h3>
            </div>
          )}
          {collection.map((item) => {
            // console.log("item.productImage: ", item.productImage);

            return (
              <div className="product-card">
                <div className="productimage">
                  <img src={item.imgofCollection} />
                </div>
                <div className="productdesc">
                  <h3>{item.nameofCollection}</h3>
                </div>
                <div className="product-times">
                  <button onClick={() => deleteCollection(item)}>
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Productcollection;
