import { NavLink } from "react-router-dom";

// Componente Navbar
const Navbar = () => {
    return (
        // Navbar Bootstrap con sfondo personalizzato
        <nav
            className="navbar navbar-expand-lg fixed-top"
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

                {/* Bottone per mostrare/nascondere la navbar su dispositivi mobili */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse" // Attributo Bootstrap che attiva/disattiva il menu a tendina
                    data-bs-target="#navbarNav" // Indica quale elemento verrà mostrato/nascosto (id del div che contiene i link di navigazione)
                    aria-controls="navbarNav" // Controlla l'elemento che verrà mostrato/nascosto
                    aria-expanded="false" // Indica se il menu è espanso o meno
                    aria-label="Toggle navigation" // Etichetta per screen reader
                >
                    <span
                        className="navbar-toggler-icon"
                        style={{ filter: "invert(1)" }} // Inverte i colori dell'icona per renderla visibile su sfondo scuro
                    ></span>
                </button>

                {/* Collegamenti di navigazione principali */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    "nav-link text-light" + (isActive ? " active" : "") // Se isActive è true, aggiunge la classe "active" per evidenziare il link
                                } // Accetta come valore di className una funzione che riceve isActive e restituisce la classe appropriata
                            >
                                🏠 Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/favorites"
                                className={({ isActive }) =>
                                    "nav-link favorite-link text-light" + (isActive ? " active" : "") // Se isActive è true, aggiunge la classe "active" per evidenziare il link
                                } // Accetta come valore di className una funzione che riceve isActive e restituisce la classe appropriata
                            >
                                ❤️ Preferiti
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/compare"
                                className={({ isActive }) =>
                                    "nav-link compare-link text-light" + (isActive ? " active" : "") // Se isActive è true, aggiunge la classe "active" per evidenziare il link
                                } // Accetta come valore di className una funzione che riceve isActive e restituisce la classe appropriata
                            >
                                🔍 Comparatore Prodotti
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;