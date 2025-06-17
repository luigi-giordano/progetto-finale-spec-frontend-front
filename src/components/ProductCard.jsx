import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    const { id, title, category, image, price, brand } = product;

    return (
        <div className="card h-100 shadow-sm">
            <img src={image} className="card-img-top object-fit-cover" alt={title} style={{ height: '200px' }} />

            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{title}</h5>
                <p className="card-text text-muted mb-1">{brand} • {category}</p>
                <p>{typeof product.price === 'number' ? product.price.toFixed(2) : 'Prezzo non disponibile'} €</p>
                <Link to={`/detail/${id}`} className="btn btn-outline-primary mt-auto">
                    Dettagli
                </Link>
            </div>
        </div>
    );
}
