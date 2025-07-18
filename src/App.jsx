import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importazione per attivare il routing (navigazione) nell'applicazione
import { GlobalProvider } from './context/GlobalContext'; // Importo il GlobalProvider per gestire lo stato globale
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Favorites from './pages/Favorites';
import Compare from './pages/Compare';
import Footer from './pages/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/compare" element={<Compare />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </GlobalProvider>
  );
}