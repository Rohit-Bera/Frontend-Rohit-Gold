//apis
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// export const error = (error) => {
//   return { status: "error", isSuccessful: false, message: error };
// };
// export const success = (data) => {
//   return { status: "success", isSuccessful: true, data: data };
// };

//users api
export const postUsersignup = async (link, data) => {
  console.log("data: ", data);

  try {
    const response = await axios.post(link, data);
    console.log("response: ", response);

    return response;
  } catch (e) {
    console.log("error: ", e);

    const error = "data already exist with this credentials";

    const send = { error };
    return send;
  }
};

export const postUsersignin = async (link, data) => {
  console.log("data: ", data);

  try {
    const response = await axios.post(link, data);
    console.log("response: ", response);

    return response;
  } catch (e) {
    console.log("error: ", e);

    const error = "data already exist with this credentials";

    const send = { error };
    return send;
  }
};

export const updateUser = async (link, data) => {
  console.log("data: ", data);

  try {
    const response = await axios.put(link, data);
    console.log("response: ", response);

    return response;
  } catch (e) {
    console.log("error: ", e);

    const error = "something went wrong";

    const send = { error };
    return send;
  }
};

export const getAllUser = async (link) => {
  try {
    const response = await axios.get(link);

    return response;
  } catch (error) {
    console.log("error: ", error);

    const response = "something went wrong";

    return response;
  }
};

export const getUserByIDApi = async (link) => {
  try {
    const response = await axios.get(link);

    return response.data;
  } catch (error) {
    console.log("error: ", error);

    const response = "something went wrong";

    return response;
  }
};

//  <--- product api --->

export const getProductApi = async (link) => {
  try {
    // console.log("link: ", link);

    // console.log("headers: ", headers);

    const product = await axios.get(link);

    const response = { success: "issuccessfull", product };
    return response;
  } catch (e) {
    console.log("error: ", e);

    const error = "something went wrong";

    const response = { error };
    return response;
  }
}; //user

export const getProductbynameApi = async (link) => {
  try {
    // console.log("link: ", link);

    // console.log("headers: ", headers);

    const product = await axios.get(link);

    const response = { success: "issuccessfull", product };
    return response;
  } catch (e) {
    console.log("error: ", e);

    const error = "something went wrong";

    const response = { error };
    return response;
  }
}; //user

export const getSearchedProductApi = async (link) => {
  // console.log("link: ", link);
  try {
    const product = await axios.get(link);

    const response = { status: 200, success: "product found", product };
    // console.log("response: ", response);

    return response;
  } catch (error) {
    const response = { status: 500, message: "something went wrong" };

    return response;
  }
}; //user

export const getAllProductApi = async (link, headers) => {
  // console.log("headers: ", headers);
  // console.log("link: ", link);
  try {
    const result = await axios.get(link, headers);

    return result;
  } catch (e) {
    console.log("error: ", e);

    const error = "something went wrong";

    const response = { error };
    return response;
  }
};

export const addProductApi = async (link, data, headers) => {
  try {
    const response = await axios.post(link, data, headers);
    console.log("data: ", data);

    return response;
  } catch (error) {
    console.log("error: ", error);

    return { warning: "somehting went wrong", error };
  }
};

export const deleteProductApi = async (link, headers) => {
  try {
    const response = await axios.delete(link, headers);

    return response;
  } catch (error) {
    console.log("error: ", error);

    return { warning: "somehting went wrong", error };
  }
};

export const updateProductApi = async (link, data, headers) => {
  try {
    const response = await axios.put(link, data, headers);

    return response;
  } catch (error) {
    console.log("error: ", error);

    return { warning: "somehting went wrong", error };
  }
};

//  <--- collection api  -->

export const getCollectionApi = async (link, headers) => {
  try {
    // console.log("link: ", link);

    // console.log("headers: ", headers);

    const response = await axios.get(link, headers);

    return response;
  } catch (error) {
    console.log("error: ", error);

    const response = "something went wrong";

    return response;
  }
};

export const postCollectionApi = async (link, data, headers) => {
  try {
    const result = await axios.post(link, data, headers);
    // console.log("data: ", data);
    // console.log("headers: ", headers);
    // console.log("link: ", link);

    const response = { success: "issuccess", result };
    return response;
  } catch (error) {
    console.log("error: ", error);

    const response = { failure: "isfail", error };

    return response;
  }
};

export const deleteCollectionApi = async (link, headers, data) => {
  try {
    const result = await axios.delete(link, data, headers);
    // console.log("data: ", data);
    // console.log("headers: ", headers);
    // console.log("link: ", link);

    const response = { success: "issuccess", result };
    return response;
  } catch (error) {
    console.log("error: ", error);

    const response = { failure: "isfail", error };

    return response;
  }
};

//  <-- order api -->

export const getallOrderApi = async (link, headers) => {
  try {
    const response = await axios.get(link, headers);

    return response;
  } catch (e) {
    console.log("e: ", e);

    const response = { error: "something went wrong" };
  }
};

export const postOrderApi = async (link, data, headers) => {
  console.log("headers: ", headers);
  console.log("data: ", data);
  console.log("link: ", link);
  try {
    const response = await axios.post(link, data, headers);
    console.log("response: ", response);
    return response;
  } catch (e) {
    const response = { error: "something went wrong" };

    return response;
  }
};

export const getmyOrderApi = async (link, headers) => {
  try {
    const response = await axios.get(link, headers);
    console.log("response: ", response);

    return response.data;
  } catch (e) {
    console.log("e: ", e);

    const response = { error: "something went wrong" };

    return response;
  }
};

export const deleteOrderApi = async (link, headers, data) => {
  try {
    const result = await axios.delete(link, headers, data);

    return result.data;
  } catch (e) {
    console.log("e: ", e);
    const response = { erorr: "something went wrong" };
    return response;
  }
};

export const updateOrderApi = async (link, data, headers) => {
  // console.log("headers: ", headers);
  // console.log("data: ", data);
  // console.log("link: ", link);
  try {
    const response = await axios.put(link, data, headers);
    console.log("response: ", response);

    return response.data;
  } catch (e) {
    console.log("e: ", e);

    const error = "something went wrong";

    return error;
  }
};

// <-- wishlist api -->

export const postWishlistApi = async (link, data, headers) => {
  console.log("headers: ", headers);
  console.log("data: ", data);
  console.log("link: ", link);
  try {
    const response = await axios.post(link, data, headers);
    // console.log("response: ", response);

    return response.data;
  } catch (e) {
    console.log("error: ", e);

    const response = { error: "something went wrong" };

    return response;
  }
};

export const getWishlistApi = async (link, headers) => {
  try {
    const response = await axios.get(link, headers);

    return response.data;
  } catch (e) {
    console.log("e: ", e);

    const response = { erorr: "something went wrong" };
    return response;
  }
};

export const deleteWishlistApi = async (link, headers, data) => {
  try {
    const response = await axios.delete(link, headers, data);

    return response.data;
  } catch (e) {
    console.log("e: ", e);

    const response = { erorr: "something went wrong" };
    return response;
  }
};

// <-- Chat apis -->

//user
export const postConversationUserApi = async (url, data, headers) => {
  try {
    const response = await axios.post(url, data, headers);
    // console.log("response: ", response);
    return response.data;
  } catch (e) {
    console.log("e: ", e);

    const response = { erorr: "something went wrong" };
    return response;
  }
};

export const getConversationUserApi = async (url, headers) => {
  try {
    const response = await axios.get(url, headers);

    return response.data;
  } catch (e) {
    console.log("e: ", e);

    const response = { erorr: "something went wrong" };
    return response;
  }
};

export const getMessageUserApi = async (url, headers) => {
  try {
    const response = await axios.get(url, headers);

    return response.data;
  } catch (e) {
    console.log("e: ", e);

    const response = { erorr: "something went wrong" };
    return response.data;
  }
};

export const postMessageUserApi = async (url, data, headers) => {
  try {
    const response = await axios.post(url, data, headers);
    console.log("response: ", response);
  } catch (e) {
    console.log("e: ", e);

    const response = { erorr: "something went wrong" };
    return response.data;
  }
};

//admin
export const postConversationAdminApi = async () => {
  try {
  } catch (e) {
    console.log("e: ", e);

    const response = { erorr: "something went wrong" };
    return response;
  }
};

export const getConversationAdminApi = async (url, headers) => {
  try {
    const response = await axios.get(url, headers);

    return response.data;
  } catch (e) {
    console.log("e: ", e);

    const response = { erorr: "something went wrong" };
    return response;
  }
};

export const getMessageforAdminApi = async (url, headers) => {
  try {
    const response = await axios.get(url, headers);

    return response.data;
  } catch (e) {
    console.log("e: ", e);

    const response = { erorr: "something went wrong" };
    return response.data;
  }
};

export const postMessageforAdminApi = async (url, data, headers) => {
  try {
    const response = await axios.post(url, data, headers);
    console.log("response: ", response);
  } catch (e) {
    console.log("e: ", e);

    const response = { erorr: "something went wrong" };
    return response.data;
  }
};
