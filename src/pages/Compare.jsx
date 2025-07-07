import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import CompareTable from "../components/CompareTable";

export default function Compare() {
    const {
        compareList,
        removeFromCompare,
        clearCompare
    } = useGlobalContext();

    // Se non ci sono prodotti nella lista di confronto, mostra un messaggio e un bottone per tornare alla home
    if (compareList.length === 0) {
        return (
            <div className="container text-center"
                style={{ marginTop: "100px" }}
            >
                <h2>Nessun prodotto da confrontare!</h2>
                <p>Aggiungi prodotti dalla home cliccando su "Confronta".</p>
                <Link to="/" className="btn btn-primary mt-3">
                    Torna alla Home
                </Link>
            </div>
        );
    }

    // Altrimenti, mostra il contenuto della pagina di confronto
    return (
        <div className="container"
            style={{ marginTop: "100px" }}
        >
            {/* Header della sezione con il titolo e un bottone per svuotare l'elenco */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Comparatore Prodotti</h2>

                {/* Bottone per svuotare tutti i prodotti dalla lista di confronto */}
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        // Chiede conferma all'utente prima di svuotare
                        if (window.confirm("Vuoi svuotare tutti i prodotti comparati?")) {
                            clearCompare();
                        }
                    }}
                >
                    Svuota confronto
                </button>
            </div>

            {/* Componente che mostra la tabella/card di confronto in base al dispositivo */}
            <CompareTable
                compareList={compareList}
                removeFromCompare={removeFromCompare}
            />
        </div>
    );
}