import userSlice from "@/features/login/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import questionSlice from "@/features/question/questionSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    questions: questionSlice,
  },
});

export default store;
