import React from 'react'
import {PostForm,Container} from '../components'

//addpost logic - creating new post,
//so we doesnt need to do anything here, bcz addpost means creating new post. and we can simply do that using postform component. hence, we'll just call postform component here

function AddPost() {
  return (
    <div className='py-8'>
      <Container>
        <PostForm/>
      </Container>
    </div>
  )
}

export default AddPost
