//1 import all important things: all hooks(useForm, useNavigate, useSelector), all the small input components of this big form, service from appwrite for using database service(create&update)

import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Button, Input, Select,RTE } from "../index";
import service from "../../appwrite/config";
// import store from '../../store/store'

export default function PostForm({ post }) {
  // we'll get a post prop which user will provide

  //2 define all the variables using hooks that we imported: useForm, useNavigate, useSelector

  const { register, control, getValues, watch, setValue, handleSubmit } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  //defaultValues are those values which we'll use in this form & we need info for defaultValues which we'll get from post prop that is provided by user. For each value, do a query whether the user is gonna create or update. Check if post is available (means we've info), use its title or other values otherwise keep the values empty

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  //3 one submit function- it will contain logic of both creation & updation of post.
  //LOGIC- if post is there, then updation happens, & if post is not there, then creation happens(will use if-else block)
  // if user has submitted, means it has passed the data, so now we've 2 cases: if post is available- update,        if post is unavailable- create,

  const submit = async (data) => {
    // updation code (if post is available, then we'll update existing post)
    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        service.deleteFile(post.featuredImage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      }); 
      

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
    // creation code (if post is not available, then we'll create a new post)
    else {
      const file =  await service.uploadFile(data.image[0]);

      //file upload done,but we'll need this image id for create account method.
      if (file) {
        // if file is uploaded correctly
        const fileId = file.$id;
        console.log(fileId,"FILEID")
        data.featuredImage = fileId;
        console.log(data.featuredImage,"Featuredimage")
        console.log(userData,"userdata")
        const dbPost = await service.createPost({
          ...data,
          userid: userData.$id,
        });
console.log(data,"data")
console.log(dbPost,"created post")
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
      
        }
      }
    }
  };

  //Function for creating slug value

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  return (
    //form, then create 2 sections in it vertically. One for title input, slug input & Editor with width 2/3
    // other one for featuredImage input, status select dropdown & submit Button with width 1/3
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        {/* Input for title */}
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        {/* Input for Slug */}
        <Input
          label="Slug:"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          // onInput={(e) => {
          //   setValue("slug", slugTransform(e.currentTarget.value), {
          //     shouldValidate: true,
          //   });
          // }}
        />

        {/* Rich Text Editor */}
        <RTE
          name="content"
          control={control}
          label="Content :"
          defaultValue={getValues("content")}
        />
      </div>

      {/* 2ND DIV WITH WIDTH 1/3 */}

      <div className="w-1/3 px-2">
        {/* Input for Image file */}
        <Input
          label="Featured Image :"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          type="file"
          {...register("image", { required: !post })}
        />

        {/* Preview for Images */}
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        {/* SELECT (DROPDOWN MENU) FOR STATUS */}
        <Select
          options={["active", "inactive"]}
          label="Status :"
          className="mb-4"
          {...register("status", { required: true })}
        />

        {/* UPDATE OR SUBMIT BUTTON */}
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
















