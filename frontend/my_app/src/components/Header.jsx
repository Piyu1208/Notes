import { Link } from "react-router-dom";


function Header() {

  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>Notes App</h2>

      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/newnote" style={styles.link}>New Note</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/signup"style={styles.link}>Signup</Link>
        <Link to="/logout"style={styles.link}>Logout</Link>
      </nav>
    </header>
  );
}


const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #ddd",
  },
  logo: {
    margin: 0,
  },
  nav: {
    display: "flex",
    gap: "16px",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  },
};

export default Header;
