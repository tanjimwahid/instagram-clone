import React from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiBookmark,
  FiEdit2,
  FiTrash2
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Comment from "../../containers/Comment/Comment";
import moment from "moment";
import "./Posts.css";

const Posts = ({ posts }) => {
  return (
    <div className="container">
      <div className="row">
        {posts &&
          posts.map(post => (
            <div
              key={post._id}
              className="col-12 d-flex justify-content-center"
            >
              <div className="card feedCard mt-5">
                <div className="card-header bg-white p-3">
                  <img
                    src={post.author.avatar}
                    alt=""
                    className="rounded-circle mr-2"
                    width="30px"
                    height="30px"
                  />
                  <Link to={`/users/${post.author.id}`} className="feedLinks">
                    {post.author.username}
                  </Link>
                </div>
                <img
                  src={post.image}
                  alt=""
                  className="card-img-top rounded-0"
                />
                <div className="p-3">
                  <div>
                    <FiHeart className="mr-2 feedIcons" />
                    <FiMessageCircle className="mr-2 feedIcons msgCircle" />
                    {post.author.id ===
                    JSON.parse(localStorage.getItem("Auth")).id ? (
                      <span>
                        <FiTrash2 className="feedIcons float-right" />
                        <Link to={`/edit/${post._id}`}>
                          <FiEdit2 className="feedIcons text-dark float-right mr-2" />
                        </Link>
                      </span>
                    ) : (
                      <FiBookmark className="feedIcons float-right" />
                    )}
                  </div>
                  <div className="mt-2">
                    <Link to="/" className="feedLinks">
                      {post.likes.length} likes
                    </Link>
                  </div>
                  <div className="mt-1">
                    <Link to={`/users/${post.author.id}`} className="feedLinks">
                      {post.author.username}
                    </Link>{" "}
                    {post.description}
                  </div>
                  <div>
                    <Link
                      to={`/posts/${post._id}`}
                      className="text-uppercase postDate"
                    >
                      {moment(post.timePosted).fromNow()}
                    </Link>
                  </div>
                  <hr />
                  <Comment postId={post._id} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
