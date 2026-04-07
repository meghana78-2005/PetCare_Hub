const CommentSection = ({ comments, newComment, onCommentChange, onCommentSubmit }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onCommentSubmit();
    }
  };

  return (
    <div className="comment-section">
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <span className="comment-user">{comment.userName}</span>
            </div>
            <p className="comment-content">{comment.content}</p>
          </div>
        ))}
      </div>
      
      <div className="comment-input-container">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => onCommentChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="comment-input"
        />
        <button onClick={onCommentSubmit} className="comment-submit">
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
