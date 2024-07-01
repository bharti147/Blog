//1 import all important things: all hooks(useForm, useNavigate, useSelector), all the small input components of this big form, service from appwrite for using database service(create&update)

import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector} from "react-redux";
import appwriteService from "../../appwrite/config"
import service from "../../appwrite/config";
// import store from '../../store/store'

function PostForm() {
  // we'll get a post prop which user will provide

  //2 define all the variables using hooks that we imported: useForm, useNavigate, useSelector

  const {register, control, getValues, watch, setValue, handleSubmit} = useForm({
    defaultValues:{
      title: post?.title || '', 
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    }
  })
  //defaultValues are those values which we'll use in this form & we need info for defaultValues which we'll get from post prop that is provided by user. For each value, do a query whether the user is gonna create or update. Check if post is available (means we've info), use its title or other values otherwise keep the values empty


  const navigate = useNavigate()
  const userData = useSelector((state)=> state.auth.userData)

  

  //3 one submit function- it will contain logic of both creation & updation of post.
  //LOGIC- if post is there, then updation happens, & if post is not there, then creation happens(will use if-else block)
  // if user has submitted, means it has passed the data, so now we've 2 cases: if post is available- update,        if post is unavailable- create,

  const submit = async (data) => {
       // updation code (if post is available, then we'll update existing post)
    if (post) {
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

        if (file) {
            appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
        }
    }
    // creation code (if post is not available, then we'll create a new post)
    else{

    }
  }

  return (
    //form, then create 2 sections in it vertically. One for title input, slug input & Editor with width 2/3
    // other one for featuredImage input, status select dropdown & submit Button with width 1/3
    <form>
      <div className="w-2/3 px-2">
        <Input />
        <Input />
        <RTE />
      </div>
      <div className="w-1/3 px-2">
        <Input />
        <Select />
        <Button type="submit" className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;

