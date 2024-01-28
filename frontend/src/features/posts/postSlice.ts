/*
 * ---------------------------------------------
 * Author: Isaac Mirabueno
 * Date: Sunday January 28th 2024
 * Last Modified by: Isaac Mirabueno - <imirabueno@yondu.com>
 * Last Modified time: January 29th 2024, 12:18:54 am
 * ---------------------------------------------
 */


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from 'immer';
import { RootState } from "../../app/store";
import { fetchPosts, fetchPost, createPost, destroyPost, updatePost } from "./postAPI";

export enum Statuses { 
  Initial = "Not Fetched",
  Loading = "Loading...",
  UpToDate = "Up To Date",
  Deleted = "Deleted",
  Error = "Error"
}

export interface PostState {
  id?: number;
  title?: string;
  body?: string;
  created_at?: any;
  updated_at?: any;
}

export interface PostFormData { 
  post: {
    id?: number;
    title?: string;
    body?: string;
  }
}

export interface PostsState { 
  posts: PostState[];
  status: string;
}

const initialState: PostsState = {
  posts: [
    {
      id: 0,
      title: "",
      body: "",
      created_at: "",
      updated_at: "",
    }
  ],
  status: Statuses.Initial
}

export const fetchPostsAsync = createAsyncThunk(
  'posts/fetchPosts', 
  async () => {
    const response = await fetchPosts();
    console.log("RES", response);
    return response
  }
)

export const fetchPostAsync = createAsyncThunk(
  'posts/fetchPost', 
  async (payload: PostFormData) => {
    const response = await fetchPost(payload);
    console.log("RES", response);
    return response
  }
)

export const createPostAsync = createAsyncThunk(
  'posts/createPost', 
  async (payload: PostFormData) => {
    const response = await createPost(payload);
    console.log("RES", response);
    return response
  }
)

export const updatePostAsync = createAsyncThunk(
  'posts/updatePost', 
  async (payload: PostFormData) => {
    const response = await updatePost(payload);
    console.log("RES", response);
    return response
  }
)

export const destroyPostAsync = createAsyncThunk(
  'posts/destroyPost', 
  async (payload: PostFormData) => {
    const response = await destroyPost(payload);
    console.log("RES", response);
    return response
  }
)

export const postSlice = createSlice({
  name: "posts",
  initialState,
  //   
  // Synchronous actions
  // 
  reducers: {},
  extraReducers: (builder) => { 
    builder
      // Fetch All Post section
      // While you wait or loading
      .addCase(fetchPostsAsync.pending, (state) => {
        return produce(state, (draftState) => { 
          draftState.status = Statuses.Loading;
        })
      })
      // You got the thing means no error
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts = action.payload;
          draftState.status = Statuses.UpToDate;
        })
      })
      // You got an Error
      .addCase(fetchPostsAsync.rejected, (state) => {
        return produce(state, (draftState) => { 
          draftState.status = Statuses.Error;
          
        })
      })

      // Fetch a Post section
      // While you wait or loading
      .addCase(fetchPostAsync.pending, (state) => {
        return produce(state, (draftState) => { 
          draftState.status = Statuses.Loading;
        })
      })
      // You got the thing means no error
      .addCase(fetchPostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts = action.payload;
          draftState.status = Statuses.UpToDate;
        })
      })
      // You got an Error
      .addCase(fetchPostAsync.rejected, (state) => {
        return produce(state, (draftState) => { 
          draftState.status = Statuses.Error;
          
        })
      })
      
      
      // Create Section
      // While you wait or loading
      .addCase(createPostAsync.pending, (state) => {
        return produce(state, (draftState) => { 
          draftState.status = Statuses.Loading;
        })
      })
      // You got the thing means no error
      .addCase(createPostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts.push(action.payload);
          draftState.status = Statuses.UpToDate;
        })
      })
      // You got an Error
      .addCase(createPostAsync.rejected, (state) => {
        return produce(state, (draftState) => { 
          draftState.status = Statuses.Error;
          
        })
      })
    
    
      // Delete Section
      // While you wait or loading
      .addCase(destroyPostAsync.pending, (state) => {
        return produce(state, (draftState) => { 
          draftState.status = Statuses.Loading;
        })
      })
      // You got the thing means no error
      .addCase(destroyPostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          console.log("draftState",draftState);
          draftState.posts = action.payload;

          draftState.status = Statuses.UpToDate;
        })
      })
      // You got an Error
      .addCase(destroyPostAsync.rejected, (state) => {
        return produce(state, (draftState) => { 
          draftState.status = Statuses.Error;
          
        })
      })

    
  }
})

export const {} = postSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;