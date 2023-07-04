"use client";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
	posts: [],
	comments: [],
	filteredComments: [],
};

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		// storePosts: (state, action) => {
		// 	state.posts = action.payload.posts;
		// },

		storeComments: (state, action) => {
			if (Array.isArray(action.payload.comments)) {
				state.comments = action.payload.comments;
			} else {
				state.comments = [...state.comments, action.payload.comments];
			}
		},
	},
});

export const postAction = postSlice.actions;

export default postSlice;
