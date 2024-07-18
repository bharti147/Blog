import React, { useEffect, useState } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser"
import { useSelector } from "react-redux";

//post logic - We'll render individual post detail in this component (a page to show full post), and for that we'll use slug using useParams (like if we are clicking on a postcard,it'll open full post) to fetch post to get post details from appwrite but first we will determine if the currently logged-in user is the author of the displayed post, and if the author is logged in then we will show the options edit or delete. If post exist then fetch post details, if not then return null

// useSelector from react-redux is used in your application to fetch the userData, which likely includes the userId. This allows you to determine if the currently logged-in user is the author of a post. The condition isAuthor = post && userData ? post.userId === userData.$id : false; checks if the userId of the post matches the userId of the logged-in user (userData). This helps in deciding whether to show options like edit or delete on the post, based on the user's authorization.

//deletePost function logic - we'll delete post using appwrite function deletepost by giving it slug(here we'll give post.$id, bcz both are same), and it will return status. If status is true, we'll delete any file attached to it using file(or image) id of that post, and then navigate to home route

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state)=>state.auth.userData)

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost().then((post) => {
        if (post) {
          setPost(post);
        } else navigate("/");
      });
    }
  }, [slug,navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      {/* items in container-  img, eit button, delete button, title, content. each one will be wrapped in a separate div */}
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
        </div>

        {/* if author is logged in show edit and delete button in a div and edit button will be a link and delete button will have a onclick function*/}
        {isAuthor && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3">
                Edit
              </Button>
            </Link>

            <Button bgColor="bg-red-500" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">Title</h1>
        </div>

        <div className="browser.css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;


