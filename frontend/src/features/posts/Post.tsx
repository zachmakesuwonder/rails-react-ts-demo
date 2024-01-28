/*
 * ---------------------------------------------
 * Author: Isaac Mirabueno
 * Date: Sunday January 28th 2024
 * Last Modified by: Isaac Mirabueno - <imirabueno@yondu.com>
 * Last Modified time: January 29th 2024, 1:51:36 am
 * ---------------------------------------------
 */

import { SyntheticEvent, useEffect, useState } from "react"
import ButtonGroup from "./ButtonGroup";
import { PostFormData } from "./postSlice";


function Post({ ...props }) {
  const [title, setTitle] = useState(props.post.title);
  const [body, setBody] = useState(props.post.body);
  const [isEditing, setIsEditing] = useState(props.postToEdit === props.post.id);

  useEffect(() => {
    setIsEditing(props.postToEdit === props.post.id)
  }, [props.postToEdit, props.post.id]);

  function submitHandler(e: SyntheticEvent) {
    e.preventDefault();
    const formData: PostFormData = {
      post: {
        id: props.post.id,
        title: title,
        body: body
      }
    }
    props.submitEdit(formData);
    resetState();
  }

  function resetState() { 
    setTitle(title);
    setBody(body);
  }


  const titleElement = <h2 className="title text-start">{title}</h2>;
  const bodyElement = <p className="card-text text text-start">{body}</p>;

  const editableTitle = <input type="text" className="form-control text-start" value={title} onChange={(e)=> setTitle(e.target.value)} />;
  const editableBody = <textarea className="form-control text-start" value={body} onChange={(e) => setBody(e.target.value)}></textarea>;

  const submitButton = <button type="submit" className="form-control" onClick={submitHandler}>Submit</button>

  return (
    <div>
      <div className="row">
        <div className="col-8">
          {isEditing ? editableTitle : titleElement}
        </div>
        <div className="col-4">
          <ButtonGroup post_id={props.post.id} dispatch={props.dispatch} toggleEditForm={ props.toggleEditForm } />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
         {isEditing ? editableBody : bodyElement}
        </div>
      </div>
      <div className="row">
        <div className="col-2">
        {isEditing && submitButton}
        </div>
      </div>
    </div>
  )
}

export default Post
