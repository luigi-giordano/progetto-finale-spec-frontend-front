// Componente che riceve come prop un voto numerico (rating) e restituisce una rappresentazione visiva con le stelle
export default function StarRating({ rating }) {
    const stars = []; // Array dove verranno salvate le stelle da mostrare (★, ⯨, ☆)

    // Loop da 1 a 5 per generare le 5 stelle
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            // Se il voto è maggiore o uguale alla stella corrente ⇒ stella piena
            stars.push('★');
        } else if (rating >= i - 0.5) {
            // Se il voto è almeno mezzo punto sotto la stella corrente ⇒ mezza stella
            stars.push('⯨');
        } else {
            // Se il voto è troppo basso ⇒ stella vuota
            stars.push('☆');
        }
    }

    return (
        <div
            className="d-flex flex-column align-items-start"
            style={{
                color: '#FFD700',
                fontSize: '1.5rem'
            }}
        >
            <div>
                {stars.map((star, index) => (
                    <span key={index}>{star}</span> // Ogni stella ha una key univoca (l'indice del loop)
                ))}
            </div>

            <div
                style={{
                    fontSize: '1rem',
                    color: '#333'
                }}
            >
                {rating.toFixed(1)} / 5
            </div>
        </div>
    );
}