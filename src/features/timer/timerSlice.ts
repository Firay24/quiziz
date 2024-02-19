import { createSlice } from "@reduxjs/toolkit";

interface TimerState {
  seconds: number;
}

const initialState: TimerState = {
  seconds: 20,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    decrementSeconds(state) {
      state.seconds--;
    },
    resetTimer(state) {
      state.seconds = initialState.seconds;
    },
  },
});

export const { decrementSeconds, resetTimer } = timerSlice.actions;

export default timerSlice.reducer;
