import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      
      {/* BRAND / TITLE */}
      <div className="sidebar-header">
        <h2>CodeCompanion</h2>
        <span className="tagline">AI Coding Partner</span>
      </div>

      {/* NAVIGATION */}
      <nav className="sidebar-nav">
        <NavLink to="/" className="nav-item">
          <span className="icon"></span>
          <span className="label">Dashboard</span>
        </NavLink>

        <NavLink to="/editor" className="nav-item">
          <span className="icon"></span>
          <span className="label">Editor</span>
        </NavLink>

        <NavLink to="/problems" className="nav-item">
          <span className="icon"></span>
          <span className="label">Problems</span>
        </NavLink>

        <NavLink to="/learn" className="nav-item">
          <span className="icon"></span>
          <span className="label">Learn</span>
        </NavLink>

        <NavLink to="/profile" className="nav-item">
          <span className="icon"></span>
          <span className="label">Profile</span>
        </NavLink>
      </nav>

    </aside>
  );
}
