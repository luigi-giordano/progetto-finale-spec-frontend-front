import React from 'react';
import { Link } from 'react-router-dom';

function capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ProductCard({
    product,
    isFavorite,
    isCompared,
    onToggleFavorite,
    onToggleCompare,
}) {
    const imgUrl = `/img/${product.title}.jpg`.replaceAll(' ', '-');

    return (
        <div className="card h-100 shadow-sm">
            <img
                className="card-img-top"
                src={imgUrl}
                alt={product.title}
                style={{ objectFit: 'cover', height: '200px' }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-muted">• {capitalizeFirstLetter(product.category)}</p>

                <Link to={`/detail/${product.id}`} className="btn btn-primary mt-auto">
                    Dettagli
                </Link>

                <div className="d-flex justify-content-between mt-3">
                    <button
                        className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
                        onClick={() => onToggleFavorite(product)}
                    >
                        {isFavorite ? '❤️ Rimuovi dai preferiti' : '🤍 Aggiungi ai preferiti'}
                    </button>

                    <button
                        className={`btn btn-sm ${isCompared ? 'btn-warning' : 'btn-outline-warning'}`}
                        onClick={() => onToggleCompare(product)}
                    >
                        {isCompared ? '🚫 Rimuovi dal confronto' : '🔍 Aggiungi al confronto'}
                    </button>
                </div>
            </div>
        </div>
    );
}
