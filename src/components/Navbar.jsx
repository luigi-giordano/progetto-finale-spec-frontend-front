import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                {/* Brand/logo */}
                <NavLink className="navbar-brand" to="/">
                    🛒 AmazBool
                </NavLink>

                {/* Toggler per mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collegamenti navigazione */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    "nav-link" + (isActive ? " active" : "")
                                }
                            >
                                🏠 Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/favorites"
                                className={({ isActive }) =>
                                    "nav-link favorite-link" + (isActive ? " active" : "")
                                }
                            >
                                ❤️ Preferiti
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/compare"
                                className={({ isActive }) =>
                                    "nav-link compare-link" + (isActive ? " active" : "")
                                }
                            >
                                🔍 Prodotti Selezionati
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
