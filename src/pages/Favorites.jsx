import { useGlobalContext } from "../context/GlobalContext";
import ProductCard from "../components/ProductCard";

const Favorites = () => {
    const { favorites, removeFavorite } = useGlobalContext();

    return (
        <div className="container mt-4">
            <h1>Prodotti Preferiti</h1>

            {favorites.length === 0 ? (
                <p>Nessun prodotto nei preferiti.</p>
            ) : (
                <div className="row">
                    {favorites.map((product) => (
                        <div className="col-md-4 mb-3" key={product.id}>
                            <ProductCard
                                product={product}
                                isFavorite={true}
                                onRemove={() => removeFavorite(product)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
