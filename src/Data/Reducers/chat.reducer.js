import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat related slice",
  initialState: {
    conversationId: "", //this stores conversationID
    message: "", // stores array of messages
  },
  reducers: {
    conversation: (state, action) => {
      // console.log("action: ", action.payload._id);

      state.conversationId = action.payload._id;
    },
    messages: (state, action) => {
      // console.log("action: ", action.payload.response);

      state.message = action.payload.response;
    },
  },
});

export const { conversation, messages } = chatSlice.actions;
export default chatSlice.reducer;
