import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./adminSlice";
import studentReducer from "./studentSlice";
import lecturerReducer from "./lecturerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    student: studentReducer,
    lecturer: lecturerReducer,
  },
});
