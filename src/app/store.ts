import { configureStore } from "@reduxjs/toolkit";

// slicer
import userSlice from "@/features/login/userSlice";
import questionSlice from "@/features/question/questionSlice";
import timerSlice from "@/features/timer/timerSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    questions: questionSlice,
    timer: timerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
