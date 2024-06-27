//1 import all important things: all hooks(useForm, useNavigate, useSelector), all the small input components of this big form, service from appwrite for using database service(create&update)

import React from 'react'

function PostForm() { // we'll get a post prop which user will provide

    //2 define all the variables using hooks that we imported: useForm, useNavigate, useSelector

    //3 one submit function- it will contain logic of both creation & updation of post.
    //LOGIC- if post is there, then updation happens, & if post is not there, then creation happens(will use if-else block)

  return (
    //form, then create 2 sections in it vertically. One for title input, slug input & Editor with width 2/3
    // other one for featuredImage input, status select dropdown & submit Button with width 1/3
    <form>
         <div className="w-2/3 px-2">
            <Input/>
            <Input/>
            <RTE/>
         </div>
         <div className="w-1/3 px-2">
            <Input/>
            <Select/>
            <Button type="submit" className="w-full">
                {post? "Update":"Submit"}
            </Button>   
         </div>
    </form>
  )
}

export default PostForm
