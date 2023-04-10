import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../GraphQL/Mutations";

type PostInput = {
  title: string;
  description: string;
};

const CreatePostForm = () => {
  const [post, setPost] = useState<PostInput>({ title: "", description: "" });

  const [createPost, { data, error }] = useMutation(CREATE_POST);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost({ variables: { post } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
      </label>
      <label>
        Description:
        <textarea
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
        />
      </label>
      <button type="submit">Create Post</button>
      {error && <p>An error occurred: {error.message}</p>}
      {data && <p>Post created with ID {data.createPost.id}</p>}
    </form>
  );
};

export default CreatePostForm;
