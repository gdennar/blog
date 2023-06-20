"use client";
import postSlice from "./postSlice";
const { configureStore, combineReducers } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
	posts: postSlice.reducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
