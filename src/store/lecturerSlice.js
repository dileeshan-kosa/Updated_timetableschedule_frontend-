import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lecturer: null,
};

export const lecturerSlice = createSlice({
  name: "lecturer",
  initialState,
  reducers: {
    setLecturerDetails: (state, action) => {
      state.lecturer = action.payload;
        // console.log("adminDetails", action.payload);
    },
  },
});

export const { setLecturerDetails } = lecturerSlice.actions;

export default lecturerSlice.reducer;