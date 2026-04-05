const UserCard = ({ avatar, name, email, onEdit }) => {
  return (
    <section className="profile-card user-card">
      <div className="user-avatar-wrap">
        <img className="user-avatar" src={avatar} alt={`${name} avatar`} />
      </div>
      <div className="user-info">
        <div>
          <h2>{name}</h2>
          <p className="user-email">{email}</p>
          <p className="user-subtitle">Hi! Manage your pets and track their health here 🐶</p>
        </div>
        <button type="button" className="primary-button" onClick={onEdit}>
          Edit Profile
        </button>
      </div>
    </section>
  );
};

export default UserCard;
