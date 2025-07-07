import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function Compare() {
    const {
        compareList,
        removeFromCompare,
        clearCompare,
    } = useGlobalContext();

    if (compareList.length === 0) {
        return (
            <div className="container my-5 text-center">
                <h2>Nessun prodotto da confrontare!</h2>
                <p>Aggiungi prodotti dalla home cliccando su "Confronta".</p>
                <Link to="/" className="btn btn-primary mt-3">
                    Torna alla Home
                </Link>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Comparatore Prodotti</h2>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        if (
                            window.confirm("Vuoi svuotare tutti i prodotti comparati?")
                        ) {
                            clearCompare();
                        }
                    }}
                >
                    Svuota confronto
                </button>
            </div>

            <div className="table-responsive shadow-sm rounded">
                <table className="table table-striped align-middle text-center mb-0">
                    <thead className="table-primary">
                        <tr>
                            <th scope="col">Nome Prodotto</th>
                            {compareList.map((product) => (
                                <th key={product.id} scope="col" className="text-truncate" style={{ maxWidth: '150px' }}>
                                    {product.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Immagine</strong></td>
                            {compareList.map((product) => (
                                <td key={product.id}>
                                    <img
                                        src={`/img/img-${product.id}.jpg`}
                                        alt={product.title}
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "contain",
                                            borderRadius: "8px",
                                            boxShadow: "0 0 8px rgba(0,0,0,0.1)",
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td><strong>Categoria</strong></td>
                            {compareList.map((product) => (
                                <td key={product.id}>{product.category}</td>
                            ))}
                        </tr>
                        <tr>
                            <td><strong>Prezzo</strong></td>
                            {compareList.map((product) => (
                                <td key={product.id}>€{product.price}</td>
                            ))}
                        </tr>
                        <tr>
                            <td><strong>Valutazione</strong></td>
                            {compareList.map((product) => (
                                <td key={product.id}>{product.rating ?? "N/A"}</td>
                            ))}
                        </tr>
                        <tr>
                            <td><strong>Azioni</strong></td>
                            {compareList.map((product) => (
                                <td key={product.id}>
                                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                                        <Link
                                            to={`/detail/${product.id}`}
                                            className="btn btn-outline-primary btn-sm"
                                        >
                                            <i className="bi bi-eye"></i> {/* icona occhio */}
                                            &nbsp; Dettagli
                                        </Link>
                                        <button
                                            className="btn btn-outline-warning btn-sm"
                                            onClick={() => removeFromCompare(product)}
                                        >
                                            <i className="bi bi-x-circle"></i> {/* icona croce */}
                                            &nbsp; Rimuovi
                                        </button>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
