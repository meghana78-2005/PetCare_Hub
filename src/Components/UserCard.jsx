const UserCard = ({ avatar, name, email, onEdit, showAvatar = false }) => {
  return (
    <section className="profile-card user-card">
      <div className={`user-avatar-wrap ${showAvatar ? 'small-avatar' : ''}`}>
        <img className="user-avatar" src={avatar} alt={`${name} avatar`} />
      </div>
      <div className="user-info">
        <div>
          <h2>{name}</h2>
          <p className="user-email">{email}</p>
          <p className="user-subtitle">Hi! Manage your pets and track their health here</p>
        </div>
        <button 
          type="button" 
          className="primary-button edit-profile-btn" 
          onClick={onEdit}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,123,255,0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,123,255,0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(0,123,255,0.3)';
          }}
        >
          Edit Profile
        </button>
      </div>
    </section>
  );
};

export default UserCard;
