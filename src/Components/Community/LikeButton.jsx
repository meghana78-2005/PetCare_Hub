import { useState } from "react";

const LikeButton = ({ likes, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  return (
    <button 
      className={`like-button ${isLiked ? 'liked' : ''}`}
      onClick={handleLike}
    >
      <span className="like-icon">❤️</span>
      <span className="like-count">{likes}</span>
    </button>
  );
};

export default LikeButton;
