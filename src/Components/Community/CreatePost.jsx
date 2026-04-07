import { useState } from "react";

const CreatePost = ({ onCreatePost }) => {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onCreatePost({
        content: content.trim(),
        image: imagePreview || null
      });
      setContent("");
      setImageFile(null);
      setImagePreview("");
    }
  };

  return (
    <div className="create-post">
      <h3>Share Your Pet Story 🐾</h3>
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <textarea
            placeholder="What's on your mind about your pet?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="post-content-input"
            rows={3}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUpload" className="image-upload-label">
            📷 Add Photo
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            className="image-upload-input"
            style={{ display: 'none' }}
          />
          {imagePreview && (
            <div className="image-preview-container">
              <img src={imagePreview} alt="Post preview" className="post-image-preview" />
              <button 
                type="button" 
                className="remove-image-btn"
                onClick={() => {
                  setImagePreview("");
                  setImageFile(null);
                }}
              >
                ✕
              </button>
            </div>
          )}
        </div>
        <button type="submit" className="submit-post-btn">
          Post 🐾
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
