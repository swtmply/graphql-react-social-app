const { UserInputError } = require("apollo-server-express");

const { Post } = require("../../models/Post");
const { User } = require("../../models/User");

module.exports = {
  Query: {
    async getPosts() {
      const posts = await Post.find({})
        .select("_id body likes user")
        .populate("user", "username")
        .exec();

      return posts;
    },
  },
  Mutation: {
    async createPost(_, { userId, body }) {
      // TODO: store user model and body to the Post model

      const user = await User.findById(userId);

      const post = await new Post({
        body,
        user: user._id,
      }).save();

      await user.update({
        $push: { posts: post._id },
      });

      return {
        ...post._doc,
        id: post._id,
      };
    },
  },
};
