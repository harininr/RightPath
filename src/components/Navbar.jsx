export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <nav className="navbar">
      <button onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>
      <h1>CodeCompanion</h1>
    </nav>
  );
}