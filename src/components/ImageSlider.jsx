import Slider from 'react-slick';

const ImageSlider = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: true,
    };

    return (
        <div className="image-slider mb-5">
            <Slider {...settings}>
                {images.map((src, i) => (
                    <div key={i}>
                        <img
                            src={src}
                            alt={`Slide ${i + 1}`}
                            style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageSlider;
