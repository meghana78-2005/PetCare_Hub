import { useState } from "react";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";

const PostCard = ({ post, onLike, onComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleComment = () => {
    if (newComment.trim()) {
      onComment(post.id, newComment.trim());
      setNewComment("");
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={post.userAvatar} alt={post.userName} className="post-avatar" />
        <div className="post-meta">
          <h4 className="post-user-name">{post.userName}</h4>
          <span className="post-timestamp">{formatDate(post.timestamp)}</span>
        </div>
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
        {post.image && (
          <img src={post.image} alt="Post" className="post-image" />
        )}
      </div>

      <div className="post-actions">
        <LikeButton 
          likes={post.likes} 
          onLike={() => onLike(post.id)} 
        />
      </div>

      <CommentSection
        comments={post.comments}
        newComment={newComment}
        onCommentChange={setNewComment}
        onCommentSubmit={handleComment}
      />
    </div>
  );
};

export default PostCard;
