import { createSlice } from "@reduxjs/toolkit";

//stores inforamtion of admin
const adminSlice = createSlice({
  name: "admin-store",
  initialState: {
    _id: "",
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    userType: "",
    token: "",
  },
  reducers: {
    adminInfo: (state, action) => {
      // console.log("action : ", action.payload);

      const { password } = action.payload;
      //   console.log("password: ", password);

      const { _id, username, email, address, phone, userType } =
        action.payload.send.data.user;
      //   console.log("username: ", username);
      // console.log("_id: ", _id);
      const { token } = action.payload.send.data;
      //   console.log("token: ", token);

      state._id = _id;
      state.username = username;
      state.userType = userType;
      state.email = email;
      state.address = address;
      state.phone = phone;
      state.token = token;
      state.password = password;
    },
  },
});

export const { adminInfo } = adminSlice.actions;

export default adminSlice.reducer;
