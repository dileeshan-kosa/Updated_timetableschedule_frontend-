import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: null,
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudentDetails: (state, action) => {
      state.student = action.payload;
      //   console.log("adminDetails", action.payload);
    },
  },
});

export const { setStudentDetails } = studentSlice.actions;

export default studentSlice.reducer;
