import { createSlice } from "@reduxjs/toolkit";

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getNewsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getNewsSuccess: (state, action) => {
      state.isFetching = false;
      state.news = action.payload;
    },
    getNewsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteNewsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteNewsSuccess: (state, action) => {
      state.isFetching = false;
      state.news.splice(
        state.news.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteNewsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateNewsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateNewsSuccess: (state, action) => {
      state.isFetching = false;
      state.news[
        state.news.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.news;
    },
    updateNewsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addNewsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addNewsSuccess: (state, action) => {
      state.isFetching = false;
      state.news.push(action.payload);
    },
    addNewsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getNewsStart,
  getNewsSuccess,
  getNewsFailure,
  deleteNewsStart,
  deleteNewsSuccess,
  deleteNewsFailure,
  updateNewsStart,
  updateNewsSuccess,
  updateNewsFailure,
  addNewsStart,
  addNewsSuccess,
  addNewsFailure,
} = newsSlice.actions;

export default newsSlice.reducer;
