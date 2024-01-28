/*
 * ---------------------------------------------
 * Author: Isaac Mirabueno
 * Date: Sunday January 28th 2024
 * Last Modified by: Isaac Mirabueno - <imirabueno@yondu.com>
 * Last Modified time: January 29th 2024, 1:28:10 am
 * ---------------------------------------------
 */


import React, { SyntheticEvent } from 'react'
import { PostFormData, destroyPostAsync } from "./postSlice";

function ButtonGroup({ ...props }) {
  
  function handleClick(event: SyntheticEvent) { 
    const payload: PostFormData = {
      post: {
        id: props.post_id
      }
    }

    props.dispatch(destroyPostAsync(payload));
  }

  return (
    <div className='btn-group float-end'>
      <button className='btn btn-warning' onClick={props.toggleEditForm}>
        Edit
      </button>

      <button className='btn btn-danger' onClick={handleClick}>
        Delete
      </button>
    </div>
  )
}

export default ButtonGroup
