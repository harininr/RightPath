export default function Dashboard() {
  return (
    <div className="dashboard">

      {/* HERO SECTION */}
      <section className="dashboard-hero">
        <h1>
          Welcome back, <span className="highlight">Coder</span> 
        </h1>
        <p className="subtitle">
          Your AI-powered coding companion is ready to help you grow.
        </p>

        <div className="hero-actions">
          <button className="btn primary">Start Coding</button>
          <button className="btn secondary">Ask AI</button>
        </div>
      </section>

      {/* STATS */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <h2>24</h2>
          <p>Problems Solved</p>
        </div>
        <div className="stat-card">
          <h2>7 </h2>
          <p>Day Streak</p>
        </div>
        <div className="stat-card">
          <h2>85%</h2>
          <p>Accuracy</p>
        </div>
        <div className="stat-card">
          <h2>42h</h2>
          <p>Time Spent</p>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="dashboard-actions">
        <h3>Quick Actions</h3>

        <div className="actions-grid">
          <button className="action-card">Start Coding</button>
          <button className="action-card">Learn Concepts</button>
          <button className="action-card">AI Code Review</button>
          <button className="action-card">Take Challenge</button>
        </div>
      </section>

    </div>
  );
}
