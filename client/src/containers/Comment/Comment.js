import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./Comment.css";

let CommentForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="comment"
        className="form-control form-control-sm border-0 commentInput"
        component="textarea"
        rows="1"
        type="text"
        placeholder="Add a comment..."
        autoComplete="off"
      />

      <button
        className="btn btn-primary btn-sm btn-block mt-2 d-block d-sm-none"
        disabled={pristine || submitting}
      >
        Post
      </button>
    </form>
  );
};

CommentForm = reduxForm({ destroyOnUnmount: true })(CommentForm);

class Comment extends Component {
  handleSubmit = data => {
    if (Object.keys(data).length !== 0 && this.props.singlePost) {
      this.props.comment(data, this.props.postId, true);
    } else if (Object.keys(data).length !== 0) {
      this.props.comment(data, this.props.postId, false);
    }
  };

  render() {
    return (
      <CommentForm form={`${this.props.postId}`} onSubmit={this.handleSubmit} />
    );
  }
}

export default connect(
  null,
  actions
)(Comment);
