import './header.css';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Header({ toggleDarkMode, darkMode }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <img src='/logo.png' width={50} alt="Logo" />
                <NavLink className="navbar-brand" to="/">Grade Mate</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink exact activeClassName="active" className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/sgpa">SGPA</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/cgpa">CGPA</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/help">HELP</NavLink>
                        </li>
                    </ul>
                    <button className="btn btn-secondary ms-auto" onClick={toggleDarkMode}>
                        {darkMode ? <img src="./sun.png" alt="Sun Icon" width="20px" /> : <img src="./night.png" alt="night Icon" width="20px" />}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Header;
