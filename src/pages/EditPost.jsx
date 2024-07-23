import React, { useEffect,useState } from 'react'
import { PostForm,Container } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config'

//editpost logic - to provide post to postform
// we have our postform component which will do the main work of updating the post, we just need to provide the post as a prop, and we will provide the post through this page editPost. Suppose we are on a post and we want to edit it, so we will simply fetch its slug and using that slug we'll fetch the post from appwrite to get its post data and set in post state and later we will give that post state to postform, if post doesnt exist navigate to home route


function EditPost() {
  const [post,setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()


  useEffect(()=>{
    if(slug){
      service.getPost(slug).then((post)=>{
        if(post){
          setPost(post)
          console.log(slug,post.$id,"slug")
        }
      })
    }
    else{
      navigate('/')
    }
  },[slug,navigate])



  return post?(
    <div className='py-8'>
      <Container>
         <PostForm post={post} />
      </Container>
    </div>
  ):null
}

export default EditPost


