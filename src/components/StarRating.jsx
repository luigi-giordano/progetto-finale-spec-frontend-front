export default function StarRating({ rating }) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push('★'); // piena
        } else if (rating >= i - 0.5) {
            stars.push('⯨'); // mezza stella (Unicode alternativo)
        } else {
            stars.push('☆'); // vuota
        }
    }

    return (
        <div className="d-flex flex-column align-items-start" style={{ color: '#FFD700', fontSize: '1.5rem' }}>
            <div>
                {stars.map((star, index) => (
                    <span key={index}>{star}</span>
                ))}
            </div>
            <div style={{ fontSize: '1rem', color: '#333' }}>{rating.toFixed(1)} / 5</div>
        </div>
    );
}
