import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import shortId from "shortid";

export const fetchQuestion = createAsyncThunk("question/fetch", async () => {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=5&type=multiple"
  );
  const data = await response.json();

  const dataWithId = data.results.map((result: any) => ({
    id: shortId.generate(),
    user_answer: "",
    all_answer: [],
    ...result,
  }));
  return dataWithId;
});

const questionAdapter = createEntityAdapter({
  selectId: (question: any) => question.id,
});

const questionSlice = createSlice({
  name: "question",
  initialState: questionAdapter.getInitialState({ loading: false, current: 0 }),
  reducers: {
    updateUserAnswer: (state, action) => {
      const { id, user_answer } = action.payload;
      questionAdapter.updateOne(state, { id, changes: { user_answer } });
    },
    updateAllAnswer: (state, action) => {
      const { id, all_answer } = action.payload;
      questionAdapter.updateOne(state, { id, changes: { all_answer } });
    },
    setCurrent: (state, action) => {
      state.current = action.payload;
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

export const { updateUserAnswer, setCurrent, updateAllAnswer } =
  questionSlice.actions;

export default questionSlice.reducer;
