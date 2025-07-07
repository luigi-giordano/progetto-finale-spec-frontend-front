import { Link } from "react-router-dom";

export default function CompareTable({ compareList, removeFromCompare }) {
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
                                        {/* Link per accedere alla pagina di dettaglio del prodotto */}
                                        <Link to={`/detail/${p.id}`} className="btn btn-outline-primary btn-sm">
                                            Dettagli
                                        </Link>

                                        {/* Bottone per rimuovere il prodotto dalla lista di confronto */}
                                        <button
                                            className="btn btn-outline-warning btn-sm"
                                            onClick={() => removeFromCompare(p)}
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
                            {/* Titolo prodotto */}
                            <h5 className="card-title">{p.title}</h5>

                            {/* Immagine prodotto */}
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

                            {/* Categoria */}
                            <p><strong>Categoria:</strong> {p.category}</p>

                            {/* Prezzo */}
                            <p><strong>Prezzo:</strong> €{p.price}</p>

                            {/* Rating con fallback */}
                            <p><strong>Rating:</strong> {p.rating ?? "N/A"}</p>

                            {/* Azioni: link dettagli e rimuovi prodotto */}
                            <div className="d-flex justify-content-center gap-2 flex-wrap mt-3">
                                <Link to={`/detail/${p.id}`} className="btn btn-outline-primary btn-sm">
                                    Dettagli
                                </Link>
                                <button
                                    className="btn btn-outline-warning btn-sm"
                                    onClick={() => removeFromCompare(p)}
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