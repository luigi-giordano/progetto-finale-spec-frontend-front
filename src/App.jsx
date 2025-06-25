import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importazione per attivare il routing (navigazione) nell'applicazione
import { GlobalProvider } from './context/GlobalContext'; // Importo il GlobalProvider per gestire lo stato globale
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Favorites from './pages/Favorites';
import Compare from './pages/Compare';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </main>
      </BrowserRouter>
    </GlobalProvider>
  );
}