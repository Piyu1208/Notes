import { NavLink } from "react-router-dom";


function Header() {

  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>Notes App</h2>

      <nav style={styles.nav}>
        <NavLink to="/" style={styles.link}>Home</NavLink>
        <NavLink to="/login" style={styles.link}>Login</NavLink>
        <NavLink to="/signup"style={styles.link}>Signup</NavLink>
        <NavLink to="/logout"style={styles.link}>Logout</NavLink>
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
