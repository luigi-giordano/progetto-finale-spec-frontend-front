function ProductCard({ product }) {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-category">{product.category}</p>
            <p>{typeof product.price === 'number' ? product.price.toFixed(2) : 'Prezzo non disponibile'} €</p>
        </div>
    );
}

export default ProductCard;