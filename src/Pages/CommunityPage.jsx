import { useState } from "react";
import NavBarComp from "../Components/NavBarComp";
import CreatePost from "../Components/Community/CreatePost";
import PostList from "../Components/Community/PostList";
import ChatRoom from "../Components/Community/ChatRoom";
import SimbaAssistant from "../Components/SimbaAssistant";
import { notifyCommunityPost } from "../Utils/NotificationUtils";
import "../Components/Community/Community.css";
import "./CommunityPage.css";

const CommunityPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      userName: "Sarah Johnson",
      userAvatar: "https://ui-avatars.com/api/?name=S&background=4caf50&color=fff&size=200",
      content: "Just adopted this adorable puppy! Any tips for first-time dog owners? 🐕",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80",
      likes: 12,
      comments: [
        { id: 1, userName: "Mike Chen", content: "Congratulations! Start with basic training early. 🐾" },
        { id: 2, userName: "Emma Wilson", content: "So cute! Puppy training classes are amazing. 🐶" }
      ],
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      userName: "Mike Chen",
      userAvatar: "https://ui-avatars.com/api/?name=M&background=2196f3&color=fff&size=200",
      content: "My cat just learned to fetch! Never thought I'd see the day 🐱",
      likes: 8,
      comments: [
        { id: 3, userName: "Lisa Park", content: "That's incredible! Cats are so smart. 🐈" }
      ],
      timestamp: new Date().toISOString()
    }
  ]);

  const [showChat, setShowChat] = useState(false);
  const [chatMember, setChatMember] = useState(false);
  const [showSimba, setShowSimba] = useState(true);

  const handleCreatePost = (newPost) => {
    const post = {
      id: posts.length + 1,
      userName: "Current User",
      userAvatar: "https://ui-avatars.com/api/?name=U&background=ff9800&color=fff&size=200",
      ...newPost,
      likes: 0,
      comments: [],
      timestamp: new Date().toISOString()
    };
    setPosts([post, ...posts]);
    // Trigger community notification
    notifyCommunityPost();
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = (postId, comment) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            comments: [...post.comments, {
              id: post.comments.length + 1,
              userName: "Current User",
              content: comment,
              timestamp: new Date().toISOString()
            }]
          } 
        : post
    ));
  };

  const handleChatToggle = () => {
    if (!chatMember) {
      const confirmMembership = window.confirm("Do you want to join the community chat? This will allow you to chat with other pet parents.");
      if (confirmMembership) {
        setChatMember(true);
        setShowChat(true);
      }
    } else {
      setShowChat(!showChat);
    }
  };

  const memberCount = 127; // Static member count for now

  return (
    <div className="community-page">
      <NavBarComp />
      <main className="community-shell">
        <div className="community-section">
          <div className="page-header">
            <h1>🐾 Pet Parents Community Hub 🐾</h1>
            <p>Share your pet stories, ask questions, and connect with fellow pet lovers! 🐕🐈🐇</p>
          </div>
          
          <CreatePost onCreatePost={handleCreatePost} />
          <PostList 
            posts={posts} 
            onLike={handleLike} 
            onComment={handleComment} 
          />
          
          <div className="chat-toggle-section">
            <button 
              className="chat-toggle-btn"
              onClick={handleChatToggle}
            >
              {showChat ? 'Hide Chat' : '🐾 Join Community Chat'}
            </button>
            {!chatMember && (
              <p className="chat-membership-note">
                💬 Join our community chat to connect with {memberCount || 127}+ pet parents! 🐾
              </p>
            )}
          </div>
          
          {showChat && chatMember && <ChatRoom />}
        </div>
      </main>
      
      {showSimba && (
        <SimbaAssistant 
          pageName="community" 
          onDismiss={() => setShowSimba(false)} 
        />
      )}
    </div>
  );
};

export default CommunityPage;
