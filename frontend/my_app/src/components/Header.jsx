import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav style={{padding: "10px", borderBottom: "1px solid #ddd"}}>
            <Link to="/">Home</Link>{" | "}
            <Link to="/login">Login</Link>{" | "}
            <Link to="/signup">Signup</Link>{" | "}
            <Link to="/new">New Note</Link>
        </nav>
    );
}

export default Header;