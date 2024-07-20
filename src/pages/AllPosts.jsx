import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";

import { PostCard , Container} from "../components";

//allpost logic - we have to render all the posts here, so we'll make a posts state to render all the posts using appwrite and we'll map that posts array to render each post by passing it as a prop to postcard.

function AllPosts() {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   service.getPosts([]).then((posts) => {
  //     if (posts) {
  //       setPosts(posts.documents);
  //       console.log(posts.documents)
  //     }
  //   });
  // }, []);
  useEffect(() => {

    appwriteService.getPosts().then((posts) => {
      if (posts) {
        console.log(posts);
          setPosts(posts.documents)
      }
  })
  }, [])


  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;



