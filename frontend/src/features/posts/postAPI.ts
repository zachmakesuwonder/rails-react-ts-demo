/*
 * ---------------------------------------------
 * Author: Isaac Mirabueno
 * Date: Sunday January 28th 2024
 * Last Modified by: Isaac Mirabueno - <imirabueno@yondu.com>
 * Last Modified time: January 29th 2024, 12:18:04 am
 * ---------------------------------------------
 */


import { PostFormData, PostState } from "./postSlice";

const API_URL = "http://localhost:3000";

export async function fetchPosts() {
  return fetch(`${API_URL}/posts.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then((response) => response.json())
    .catch((error) => {
    console.log("Error", error);
    return {} as PostState
  })
}

export async function fetchPost(payload: PostFormData) {
  const post = payload.post
  return fetch(`${API_URL}/posts/${post.id}.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then((response) => response.json())
    .catch((error) => {
    console.log("Error", error);
    return {} as PostState
  })
}

export async function createPost(payload: PostFormData) {
  const post = payload.post
  return fetch(`${API_URL}/posts.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
    .then((response) => response.json())
    .catch((error) => {
    console.log("Error", error);
    return {} as PostState
  })
}

export async function updatePost(payload: PostFormData) {
  const post = payload.post
  return fetch(`${API_URL}/posts/${post.id}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
    .then((response) => response.json())
    .catch((error) => {
    console.log("Error", error);
    return {} as PostState
  })
}

export async function destroyPost(payload: PostFormData) {
  const post = payload.post
  return fetch(`${API_URL}/posts/${post.id}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
    .then((response) => response.json())
    .catch((error) => {
    console.log("Error", error);
    return {} as PostState
  })
}