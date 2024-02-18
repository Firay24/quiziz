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
    ...result,
  }));
  return dataWithId;
});

const questionAdapter = createEntityAdapter({
  selectId: (question: any) => question.id,
});

const questionSlice = createSlice({
  name: "question",
  initialState: questionAdapter.getInitialState({ loading: false }),
  reducers: {},
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
  (state: any) => state.comments
);

export default questionSlice.reducer;
