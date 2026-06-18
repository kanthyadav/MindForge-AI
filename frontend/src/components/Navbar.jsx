import { FaBrain } from "react-icons/fa";

function Navbar({ setToken }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <nav className="navbar">
      <h2>
        <FaBrain /> MindForge AI
      </h2>

      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;