const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  body: String,
  likes: String,
});

const postSchema = new Schema(
  {
    body: String,
    likes: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = {
  Post: model("Post", postSchema),
  Comment: model("Comment", commentSchema),
};
