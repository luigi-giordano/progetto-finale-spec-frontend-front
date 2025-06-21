import {
    FaFacebookF,
    FaInstagram,
    FaPinterest
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer-custom-bg text-light py-4 mt-5">
            <div className="container-fluid">
                <div className="row text-center text-md-start">

                    {/* Colonna sinistra - Link utili */}
                    <div className="col-12 col-md-4 mb-4 mb-md-0">
                        <h5>Link utili 🡇</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-light text-decoration-none">Home</a></li>
                            <li><a href="/contatti" className="text-light text-decoration-none">Contatti</a></li>
                            <li><a href="/faq" className="text-light text-decoration-none">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Colonna centrale - Copyright */}
                    <div className="col-12 col-md-4 mb-4 mb-md-0 d-flex align-items-center justify-content-center">
                        <p className="mb-0">© 2025 AmazBool - Tutti i diritti riservati</p>
                    </div>

                    {/* Colonna destra - Social con icone */}
                    <div className="col-12 col-md-4 mb-4 mb-md-0 d-flex flex-column align-items-center align-items-md-end">
                        <h5>🡇 Seguici!</h5>
                        <div className="d-flex justify-content-center justify-content-md-end gap-3 mt-2">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                                <FaFacebookF />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                                <FaInstagram />
                            </a>
                            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                                <FaPinterest />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
