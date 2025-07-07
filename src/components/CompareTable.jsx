import { Link } from "react-router-dom";

export default function CompareTable({ compareList, removeFromCompare }) {
    // Funzione wrapper per il controllo del numero minimo di prodotti
    const handleRemove = (product) => {
        if (compareList.length <= 2) {
            alert("Impossibile eliminare il prodotto, minimo 2 prodotti");
            return;
        }
        removeFromCompare(product);
    };

    return (
        <>
            {/* Tabella versione Desktop */}
            <div className="table-responsive d-none d-md-block shadow-sm rounded">
                <table className="table compare-table table-striped align-middle text-center mb-0">
                    <thead className="table-primary">
                        <tr>
                            <th>Nome Prodotto</th>
                            {compareList.map((p) => (
                                <th key={p.id} className="text-truncate" style={{ maxWidth: "150px" }}>
                                    {p.title}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {/* Riga delle immagini dei prodotti */}
                        <tr>
                            <td><strong>Immagine</strong></td>
                            {compareList.map((p) => (
                                <td key={p.id}>
                                    <img
                                        src={`/img/img-${p.id}.jpg`}
                                        alt={p.title}
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

                        {/* Riga categoria */}
                        <tr>
                            <td><strong>Categoria</strong></td>
                            {compareList.map((p) => (
                                <td key={p.id}>{p.category}</td>
                            ))}
                        </tr>

                        {/* Riga prezzo */}
                        <tr>
                            <td><strong>Prezzo</strong></td>
                            {compareList.map((p) => (
                                <td key={p.id}>€{p.price}</td>
                            ))}
                        </tr>

                        {/* Riga valutazione con fallback "N/A" se rating è assente */}
                        <tr>
                            <td><strong>Valutazione</strong></td>
                            {compareList.map((p) => (
                                <td key={p.id}>{p.rating ?? "N/A"}</td>
                            ))}
                        </tr>

                        {/* Riga con azioni: link ai dettagli e bottone per rimuovere il prodotto dalla lista */}
                        <tr>
                            <td></td>
                            {compareList.map((p) => (
                                <td key={p.id}>
                                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                                        <Link to={`/detail/${p.id}`} className="btn btn-outline-primary btn-sm">
                                            Dettagli
                                        </Link>
                                        <button
                                            className="btn btn-outline-warning btn-sm"
                                            onClick={() => handleRemove(p)}
                                        >
                                            Rimuovi
                                        </button>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Versione Mobile */}
            <div className="d-md-none">
                {compareList.map((p) => (
                    <div
                        key={p.id}
                        className="card mb-4 shadow-sm"
                        style={{ borderRadius: "12px" }}
                    >
                        <div className="card-body text-center">
                            <h5 className="card-title">{p.title}</h5>

                            <img
                                src={`/img/img-${p.id}.jpg`}
                                alt={p.title}
                                style={{
                                    width: "100%",
                                    height: "180px",
                                    objectFit: "contain",
                                    borderRadius: "8px"
                                }}
                            />

                            <p><strong>Categoria:</strong> {p.category}</p>
                            <p><strong>Prezzo:</strong> €{p.price}</p>
                            <p><strong>Rating:</strong> {p.rating ?? "N/A"}</p>

                            <div className="d-flex justify-content-center gap-2 flex-wrap mt-3">
                                <Link to={`/detail/${p.id}`} className="btn btn-outline-primary btn-sm">
                                    Dettagli
                                </Link>
                                <button
                                    className="btn btn-outline-warning btn-sm"
                                    onClick={() => handleRemove(p)}
                                >
                                    Rimuovi
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
