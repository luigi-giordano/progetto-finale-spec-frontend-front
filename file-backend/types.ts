export type Product = {
    id: number;
    title: string;
    category: string; // "cuffie", "fotocamere", "microfoni"
    brand: string;
    description: string;
    price: number;
    image: string; // URL immagine prodotto
    features: string[]; // lista di caratteristiche tecniche
    releaseYear: number;
    rating: number; // da 1 a 5, valore medio
};