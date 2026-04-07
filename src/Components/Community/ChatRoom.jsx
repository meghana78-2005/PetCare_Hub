import { useState, useEffect, useRef } from "react";
import { auth } from "../../firebase/FireBaseConfig";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [memberCount, setMemberCount] = useState(127);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        setMessages([{
          id: 1,
          userName: "System",
          message: `🎉 Welcome to the community chat, ${user.displayName || user.email}! 🐾`,
          timestamp: new Date()
        }]);
        
        // Simulate member count updates
        const memberInterval = setInterval(() => {
          setMemberCount(prev => prev + Math.floor(Math.random() * 3) - 1);
        }, 30000);
        
        return () => clearInterval(memberInterval);
      }
    });

    return () => unsubscribe();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && currentUser) {
      const message = {
        id: messages.length + 1,
        userName: currentUser.displayName || currentUser.email,
        message: newMessage.trim(),
        timestamp: new Date(),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage("");
      setIsTyping(false);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (!isTyping && e.target.value.length > 0) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const today = new Date();
    const msgDate = new Date(timestamp);
    if (today.toDateString() === msgDate.toDateString()) {
      return 'Today';
    }
    return msgDate.toLocaleDateString();
  };

  if (!currentUser) {
    return (
      <div className="chat-room whatsapp-style">
        <div className="chat-header">
          <div className="chat-info">
            <h4>🐾 Pet Parents Community</h4>
            <div className="chat-meta">
              <span className="member-count">👥 {memberCount} members</span>
              <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}></span>
            </div>
          </div>
        </div>
        
        <div className="chat-messages">
          <div className="auth-required">
            <div className="lock-icon">🔒</div>
            <h3>Join the Conversation!</h3>
            <p>Please sign in to connect with {memberCount}+ pet parents in our community.</p>
            <button className="signin-chat-btn">Sign In to Chat</button>
          </div>
        </div>
      </div>
    );
  }

  // Group messages by date
  const groupedMessages = [];
  let lastDate = null;
  
  messages.forEach((msg) => {
    const msgDate = new Date(msg.timestamp).toDateString();
    if (msgDate !== lastDate) {
      groupedMessages.push({ type: 'date', date: msgDate });
      lastDate = msgDate;
    }
    groupedMessages.push({ type: 'message', ...msg });
  });

  return (
    <div className="chat-room whatsapp-style">
      <div className="chat-header">
        <div className="chat-info">
          <h4>🐾 Pet Parents Community</h4>
          <div className="chat-meta">
            <span className="member-count">👥 {memberCount} members</span>
            <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}></span>
          </div>
        </div>
      </div>
      
      <div className="chat-messages">
        {groupedMessages.map((item, index) => {
          if (item.type === 'date') {
            return (
              <div key={`date-${index}`} className="date-divider">
                <span>{formatDate(item.date)}</span>
              </div>
            );
          }
          
          return (
            <div key={item.id} className={`message-wrapper ${item.isOwn ? 'own-message' : 'other-message'}`}>
              <div className={`chat-message ${item.userName === 'System' ? 'system-message' : ''}`}>
                {!item.isOwn && (
                  <div className="message-avatar">
                    {item.userName === 'System' ? '🦁' : item.userName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="message-content-wrapper">
                  <div className="message-user">{item.userName}</div>
                  <div className="message-content">{item.message}</div>
                  <div className="message-time">{formatTime(item.timestamp)}</div>
                </div>
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-avatar">🐾</div>
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="chat-input-form">
        <div className="chat-input-container">
          <button type="button" className="chat-emoji-btn">😊</button>
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="chat-input"
          />
          <button type="submit" className="chat-send-btn" disabled={!newMessage.trim()}>
            <span>➤</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;
