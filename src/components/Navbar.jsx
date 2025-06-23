// Importa React e il componente NavLink da react-router-dom per la navigazione
import React from "react";
import { NavLink } from "react-router-dom";

// Componente Navbar
const Navbar = () => {
    return (
        // Navbar Bootstrap con sfondo personalizzato
        <nav
            className="navbar navbar-expand-lg"
            style={{ backgroundColor: '#1b263b' }}
        >
            <div className="container-fluid">
                {/* Logo del brand, cliccabile, reindirizza alla home */}
                <NavLink
                    className="navbar-brand"
                    to="/"
                >
                    <img
                        src="/img/logo.png"
                        alt="AmazBool Logo"
                        style={{
                            height: '40px',
                            objectFit: 'contain',
                            borderRadius: '5px'
                        }}
                    />
                </NavLink>

                {/* Bottone per aprire/chiudere la navbar su dispositivi mobili */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span
                        className="navbar-toggler-icon"
                        style={{ filter: "invert(1)" }}
                    ></span>
                </button>

                {/* Collegamenti di navigazione principali */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    "nav-link text-light" + (isActive ? " active" : "")
                                } // Aggiunge la classe 'active' se la route corrisponde
                            >
                                🏠 Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/favorites"
                                className={({ isActive }) =>
                                    "nav-link favorite-link text-light" + (isActive ? " active" : "")
                                }
                            >
                                ❤️ Preferiti
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/compare"
                                className={({ isActive }) =>
                                    "nav-link compare-link text-light" + (isActive ? " active" : "")
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