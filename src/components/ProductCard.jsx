import React from 'react';
import { Link } from 'react-router-dom';

function capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ProductCard({ product }) {
    return (
        <div className="card h-100 shadow-sm">
            <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
                style={{ objectFit: 'cover', height: '200px' }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-muted"> • {capitalizeFirstLetter(product.category)}</p>
                <Link to={`/detail/${product.id}`} className="btn btn-primary mt-auto">
                    Dettagli
                </Link>
            </div>
        </div>
    );
}
