import { useQuery, gql } from "@apollo/client";
import { LOAD_POSTS } from "../GraphQL/Queries";
import { useEffect, useState } from "react";

type postType = {
  id: string;
  title: string;
  description: string;
};

const Postlist = () => {
  const { loading, error, data } = useQuery(LOAD_POSTS);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data) {
      setPosts(data.getAllPosts);
    }
  }, [data]);

  if (loading) return <p>loading...</p>;

  if (error) return <p>Error occured...</p>;

  console.log(data);

  return (
    <div>
      <h1>Here is the booklist</h1>
      {posts.map((post: postType) => (
        <div
          style={{ height: "200px", width: "400px", border: "1px solid red", borderRadius: "12px" }}
          key={post.id}
        >
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Postlist;
