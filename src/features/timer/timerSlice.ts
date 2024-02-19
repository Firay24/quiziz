import { createSlice } from "@reduxjs/toolkit";

const timerFromLocalStorage = localStorage.getItem("timer");
const timerInitial =
  timerFromLocalStorage !== null ? parseInt(timerFromLocalStorage) : 180;

interface TimerState {
  seconds: number;
}

const initialState: TimerState = {
  seconds: timerInitial,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    decrementSeconds(state) {
      state.seconds--;
      localStorage.setItem("timer", state.seconds.toString());
    },
    resetTimer(state) {
      state.seconds = 180;
      localStorage.setItem("timer", "20");
    },
  },
});

export const { decrementSeconds, resetTimer } = timerSlice.actions;

export default timerSlice.reducer;
