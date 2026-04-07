import PostCard from "./PostCard";

const PostList = ({ posts, onLike, onComment }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLike}
          onComment={onComment}
        />
      ))}
    </div>
  );
};

export default PostList;
