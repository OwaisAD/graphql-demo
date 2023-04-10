import Post from "./models/Post.model";

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World!";
    },
    getAllPosts: async () => {
      return await Post.find({});
    },
    getPostById: async (_parent: any, args: any, _context: any, _info: any) => {
      const id = args.id;
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (parent: any, args: any, context: any, info: any) => {
      const { title, description } = args.post;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },
    deletePost: async (_parent: any, args: any, _context: any, _info: any) => {
      const id = args.id;
      await Post.findByIdAndDelete(id);
      return `Ok - post with id ${id} was successfully deleted`;
    },
    updatePost: async (_parent: any, args: any, _context: any, _info: any) => {
      const id = args.id;
      const { title, description } = args.post;
      type post = {
        title?: String
        description?: String
      }
      const updatedPost: post = {};
      if (title !== undefined) {
        updatedPost.title = title;
      }
      if (description !== undefined) {
        updatedPost.description = description;
      }

      const post = await Post.findByIdAndUpdate(id, updatedPost, { new: true });
      return post;
    },
  },
};

export default resolvers;
