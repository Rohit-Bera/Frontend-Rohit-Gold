import React, { useEffect, useState } from "react";
import {
  deleteProductApi,
  getAllProductApi,
  getProductApi,
} from "../Data/Services/Oneforall";
import "../styles.admin/product.allproduct.css";
import AdminNav from "./AdminNav";
import Productnav from "./Product.nav";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { updateProductr } from "../Data/Reducers/updateproduct.reducer";

import Loader from "react-loader-spinner";

const Productallproduct = () => {
  //-------------------------statess----------------------------------

  const [allProduct, setAllProduct] = useState([]); //all product state

  useEffect(() => {
    getProduct();
  }, []);

  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false); // loaders state

  const [checkNull, setNull] = useState(false); //null state

  //-------------------------functions----------------------------------

  //admin token
  const token = useSelector((state) => state.adminReducer).token;

  //getproduct
  const getProduct = async () => {
    setLoader(true);
    try {
      const url = "https://rohit-goldapp-backend.herokuapp.com/getallproduct";
      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const response = await getAllProductApi(url, headers);
      // console.log("response: ", response.data);

      if (response) {
        setLoader(false);
      } else {
        setLoader(false);
      }

      if (response.data.allproducts.length !== 0) {
        setNull(true);
      } else {
        setNull(false);
      }

      setAllProduct(response.data.allproducts);
    } catch (error) {
      // console.log("error: ", error);
    }
  };

  //deleteProduct
  const deleteProduct = async (item) => {
    try {
      // console.log("item clicked", item);

      const { _id } = item;

      const url = `https://rohit-goldapp-backend.herokuapp.com/deleteproduct/${_id}`;
      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const response = await deleteProductApi(url, headers);

      if (response.data.success) {
        toast.success("deleted successfully", {
          position: "bottom-right",
        });
      } else {
        toast.error("something went wrong", {
          position: "bottom-right",
        });
      }

      getProduct();
    } catch (error) {
      // console.log("error: ", error);
      toast.error("something went wrong", {
        position: "bottom-right",
      });
    }
  };

  //updata Product
  const updateProduct = async (item) => {
    // console.log("item :", item);

    dispatch(updateProductr({ item }));
  };

  return (
    <>
      <AdminNav />
      <Productnav />
      {checkNull ? (
        ""
      ) : (
        <div
          style={{
            color: "crimson",
            fontSize: "20px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <h3>No products added</h3>
        </div>
      )}
      <div className="all-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "170px",
          }}
        >
          {loader ? (
            <Loader type="Puff" color="crimson" height={100} width={100} />
          ) : (
            ""
          )}
        </div>

        <div className="all-body">
          {allProduct.map((item) => {
            // console.log("item: ", item);

            if (item.availableStatus === true) {
              return (
                <div className="all-card">
                  <table>
                    <tr>
                      <td className="img">
                        <img src={item.productImage[0]} />
                      </td>
                      <td className="pname">
                        <p>{item.productName}</p>
                      </td>
                      <td className="cname">
                        <p>{item.collectionName}</p>
                      </td>
                      <td className="price">
                        <p>{item.price}</p>
                      </td>
                      <td className="weight">
                        <p>{item.weight}</p>
                      </td>
                      <td className="purity">
                        <p>{item.purity}</p>
                      </td>
                      <td className="category">
                        <p>{item.category}</p>
                      </td>
                      <td className="status">
                        <p className="available">
                          <div className="open"></div>open
                        </p>
                      </td>

                      <td className="edit">
                        <Link to="/adminpannel/products/updateProduct">
                          <button
                            title="edit"
                            onClick={() => updateProduct(item)}
                          >
                            <i class="fas fa-cogs"></i>
                          </button>
                        </Link>
                      </td>

                      <td className="cross">
                        <button
                          title="delete"
                          onClick={() => deleteProduct(item)}
                        >
                          <i class="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  </table>
                </div>
              );
            } else if (item.availableStatus === false) {
              return (
                <div className="all-card">
                  <table>
                    <tr>
                      <td className="img">
                        <img src={item.productImage[0]} />
                      </td>
                      <td className="pname">
                        <p>{item.productName}</p>
                      </td>
                      <td className="cname">
                        <p>{item.collectionName}</p>
                      </td>
                      <td className="price">
                        <p>{item.price}</p>
                      </td>
                      <td className="weight">
                        <p>{item.weight}</p>
                      </td>
                      <td className="purity">
                        <p>{item.purity}</p>
                      </td>
                      <td className="category">
                        <p>{item.category}</p>
                      </td>
                      <td className="status">
                        <p className="unavailable">
                          <div className="close"></div>close
                        </p>
                      </td>

                      <td className="edit">
                        <Link to="/adminpannel/products/updateProduct">
                          <button
                            title="edit"
                            onClick={() => updateProduct(item)}
                          >
                            <i class="fas fa-cogs"></i>
                          </button>
                        </Link>
                      </td>

                      <td className="cross">
                        <button
                          title="delete"
                          onClick={() => deleteProduct(item)}
                        >
                          <i class="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  </table>
                </div>
              );
            } else {
              return (
                <div className="null">
                  <h3>No Orders added yet</h3>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Productallproduct;
