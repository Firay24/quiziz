import shuffleArray from "@/util/shuffleArray";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import shortId from "shortid";

const currentFromLocalStorage = localStorage.getItem("current");
const currentInitial =
  currentFromLocalStorage !== null ? parseInt(currentFromLocalStorage) : 0;

export const fetchQuestion = createAsyncThunk("question/fetch", async () => {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=5&type=multiple"
  );
  const data = await response.json();

  const dataWithId = data.results.map((result: any) => ({
    id: shortId.generate(),
    user_answer: "",
    all_answer: shuffleArray([
      ...result.incorrect_answers,
      result.correct_answer,
    ]),
    ...result,
  }));
  localStorage.setItem("questions", JSON.stringify(dataWithId));
  return dataWithId;
});

const questionAdapter = createEntityAdapter({
  selectId: (question: any) => question.id,
});

const questionSlice = createSlice({
  name: "question",
  initialState: questionAdapter.getInitialState({
    loading: false,
    current: currentInitial,
    status: localStorage.getItem("status") || "pre",
  }),
  reducers: {
    updateUserAnswer: (state, action) => {
      const { id, user_answer } = action.payload;
      questionAdapter.updateOne(state, { id, changes: { user_answer } });
      localStorage.setItem("questions", JSON.stringify(state.entities));
    },
    updateAllAnswer: (state, action) => {
      const { id, all_answer } = action.payload;
      questionAdapter.updateOne(state, { id, changes: { all_answer } });
    },
    setCurrent: (state, action) => {
      state.current = action.payload;
      localStorage.setItem("current", action.payload.toString());
    },
    setAllQuestions: questionAdapter.setAll,
    setStatus: (state, action) => {
      state.status = action.payload;
      localStorage.setItem("status", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestion.fulfilled, (state, action) => {
        state.loading = false;
        questionAdapter.setAll(state, action.payload);
      })
      .addCase(fetchQuestion.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const questionsSelectors = questionAdapter.getSelectors(
  (state: any) => state.questions
);

export const {
  updateUserAnswer,
  setCurrent,
  updateAllAnswer,
  setAllQuestions,
  setStatus,
} = questionSlice.actions;

export default questionSlice.reducer;
