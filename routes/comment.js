const Post = require("../models/post");
const Comment = require("../models/comment");
const mongoose = require("mongoose");
mongoose.Promise = Promise;

module.exports = router => {
  router.post("/posts/:post_id/comments", (req, res) => {
    let newComment = {};
    Post.findById(req.params.post_id)
      .exec()
      .then(post => {
        return Comment.create({ text: req.body.comment });
      })
      .then(comment => {
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        comment.save();
        return (newComment = comment);
      })
      .then(result => {
        return Post.findById(req.params.post_id)
          .populate("comments")
          .populate("likes")
          .exec();
      })
      .then(post => {
        post.comments.push(newComment);
        post.save();
        const data = {
          postId: post._id,
          comment: newComment,
          post: post
        };
        return res.json(data);
      })
      .catch(error => {
        console.log(error);
      });
  });
};
