// Importa il componente Slider dal pacchetto 'react-slick', una libreria per slider/caroselli
import Slider from 'react-slick';

// Componente che riceve una prop 'images', un array di URL di immagini
const ImageSlider = ({ images }) => {
    // Impostazioni dello slider, passate come oggetto al componente Slider
    const settings = {
        dots: true,            // Mostra i pallini di navigazione sotto lo slider
        infinite: true,        // Permette lo scorrimento infinito (ciclo continuo)
        speed: 600,            // Velocità della transizione tra slide (in millisecondi)
        slidesToShow: 1,       // Numero di slide da mostrare contemporaneamente
        slidesToScroll: 1,     // Numero di slide da scorrere per ogni interazione
        autoplay: true,        // Avvia lo scorrimento automatico
        autoplaySpeed: 3500,   // Intervallo di tempo tra uno scorrimento automatico e il successivo
        arrows: true,          // Mostra le frecce per navigare tra le slide
        draggable: false,      // Disattiva il trascinamento con il mouse o touch
    };

    return (
        <div className="image-slider mb-5">
            {/* Inizializza lo slider con le impostazioni definite sopra */}
            <Slider {...settings}>
                {/* Mappa ogni URL dell'immagine per creare una slider */}
                {images.map((src, i) => (
                    <div key={i}>
                        <img
                            src={src}
                            alt={`Slide ${i + 1}`}
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '12px'
                            }}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};
export default ImageSlider;