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
        <div className="product-card">
            <img
                className="product-image"
                src={imgUrl}
                alt={product.title}
            />

            <div className="product-title">{product.title}</div>
            <div className="product-category">• {capitalizeFirstLetter(product.category)}</div>

            <Link
                to={`/detail/${product.id}`}
                className="btn btn-primary w-100 mt-3"
            >
                Dettagli
            </Link>

            <div className="d-flex justify-content-between mt-3 w-100">
                <button
                    className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
                    onClick={() => onToggleFavorite(product)}
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>

                <button
                    className={`btn btn-sm ${isCompared ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => onToggleCompare(product)}
                >
                    {isCompared ? '🚫' : '🔍'}
                </button>
            </div>
        </div>
    );
}
