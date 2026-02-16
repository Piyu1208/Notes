function Navbar() {

    return (
        <nav className="navbar">
            <h1>Notes App</h1>
            <div className="links">
                <a href='/'>Home</a>
                <a href="/create" style={{
                }}>New Note</a>
            </div>
        </nav>
    );
}

export default Navbar;