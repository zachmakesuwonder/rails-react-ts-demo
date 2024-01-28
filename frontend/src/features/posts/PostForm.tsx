/*
 * ---------------------------------------------
 * Author: Isaac Mirabueno
 * Date: Sunday January 28th 2024
 * Last Modified by: Isaac Mirabueno - <imirabueno@yondu.com>
 * Last Modified time: January 28th 2024, 11:43:54 pm
 * ---------------------------------------------
 */

import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux"
import { PostFormData, createPostAsync } from "./postSlice";
import { AppDispatch } from "../../app/store";

function PostForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function submitHandler(event: SyntheticEvent) { 
    event.preventDefault();
    const formData: PostFormData = {
      post: {
        title: title,
        body: body
      }
    }

    dispatch(createPostAsync(formData));
    resetState();
  }
  
  function resetState() { 
    setTitle('');
    setBody('');
  }

  return (
    <div>
      <h1>PostForm</h1>
      <form>
        <input type="text" className="form-control text-start" name="title" value={title} onChange={(e)=> setTitle(e.target.value)} />
        <textarea name="body" id="body" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        <button type="submit" onClick={submitHandler}>Submit</button>
      </form>
    </div>
  )
}

export default PostForm
