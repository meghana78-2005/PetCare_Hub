const ActivityCard = ({ stats }) => {
  return (
    <section className="profile-card activity-card">
      <div className="activity-header">
        <h3>Activity</h3>
        <span className="activity-count">{stats.posts} posts</span>
      </div>
      <div className="activity-list">
        {stats.recent.map((item, index) => (
          <div key={index} className="activity-item">
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivityCard;
