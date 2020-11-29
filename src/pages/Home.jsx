import React, { useContext, useEffect } from "react";

import { PostsContext } from "../contexts";

const Home = () => {
  const { posts } = useContext(PostsContext);

  return (
    <div>
      {posts.map((post, index) => (
        <div className="post" key={index}>
          <h4>{post.user.username}</h4>
          <p>{post.body}</p>
          <p>Likes: {post.likes}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
