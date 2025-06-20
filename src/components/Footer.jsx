import React from 'react';

const Footer = () => {
    return (
        <footer className="footer-custom-bg text-light py-4 mt-5">
            <div className="container-fluid">
                <div className="row align-items-center">

                    {/* Colonna sinistra - Link utili */}
                    <div className="col-md-4 text-start">
                        <h5>Link utili</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-light text-decoration-none">Home</a></li>
                            <li><a href="/contatti" className="text-light text-decoration-none">Contatti</a></li>
                            <li><a href="/faq" className="text-light text-decoration-none">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Colonna centrale - Copyright */}
                    <div className="col-md-4 text-center">
                        <p className="mb-0">© 2025 AmazBool - Tutti i diritti riservati</p>
                    </div>

                    {/* Colonna destra - Social */}
                    <div className="col-md-4 text-end">
                        <h5>Seguici</h5>
                        <ul className="list-unstyled">
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Facebook</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Instagram</a></li>
                            <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Pinterest</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
