import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import * as actions from "../../actions";
import * as Icon from "react-feather";
import "./NewPost.css";

const mapStateToProps = state => {
  return {
    imgPreview: state.post.preview,
    newPostError: state.post.newPostError
  };
};

// const validateImage = imageList => {
//   if (imageList) {
//     if (imageList.length > 1) {
//       return "Only 1 image allowed";
//     } else if (imageList.length === 1) {
//       let selectedImage = imageList[0];
//       if (!selectedImage.type.match("image.*")) {
//         return "Only image files are allowed";
//       } else if (selectedImage.size > 1048576) {
//         return "Maximum file size exceeded";
//       }
//     }
//   }
// };

const renderDropzoneField = ({ input, name }) => {
  return (
    <div>
      <Dropzone
        name={name}
        className="drop mt-1 rounded"
        accept="image/jpeg, image/jpg, image/png"
        onDrop={filesToUpload => input.onChange(filesToUpload)}
      >
        <div className="d-flex justify-content-center h-100">
          <div className="text-center align-self-center">
            <div>
              <Icon.Plus className="text-muted camera" />
            </div>
            <span className="text-muted avatarText">Upload Image</span>
          </div>
        </div>
      </Dropzone>
    </div>
  );
};

let PostForm = props => {
  const { handleSubmit, onValues, preview, errorMsg } = props;
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {errorMsg && (
        <div className="text-center mt-1">
          <small className="text-danger">{errorMsg}</small>
        </div>
      )}
      <Field name="image" component={renderDropzoneField} onChange={onValues} />
      <Field
        name="caption"
        component={renderField}
        type="text"
        label="Write a caption..."
      />
      {preview ? (
        <button className="btn btn-primary btn-sm btn-block mt-3">Post</button>
      ) : (
        <button className="btn btn-primary btn-sm btn-block mt-3" disabled>
          Post
        </button>
      )}
    </form>
  );
};

const renderField = ({ input, label, type }) => (
  <textarea
    className="form-control form-control-sm mt-1 inputBg"
    {...input}
    placeholder={label}
    type={type}
  />
);

PostForm = reduxForm({
  form: "createPost",
  destroyOnUnmount: true
})(PostForm);

class NewPost extends Component {
  handleSubmit = data => {
    this.props.createPost(data);
  };

  onValues = image => {
    this.props.getPreview(image[0].preview);
  };

  render() {
    return (
      <div>
        <div className="container d-flex justify-content-center mt-5">
          <div className="card p-2 postCard rounded-0">
            <div className="card-body">
              <h1 className="insta text-center">New Post</h1>
              {this.props.imgPreview && (
                <div className="text-center mt-4">
                  <img
                    src={this.props.imgPreview}
                    className="imgPreview"
                    alt=""
                    width="100%"
                  />
                </div>
              )}
              <PostForm
                onSubmit={this.handleSubmit}
                onValues={this.onValues}
                preview={this.props.imgPreview}
                errorMsg={this.props.newPostError}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  actions
)(NewPost);
