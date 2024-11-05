import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../component-css/slider.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function Sliders() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds per slide
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad:false, // Load slides as they appear
  };

  return (
    <div id="slider-container">
      
      <Slider className='Slider' {...settings}>
        <div id="sliders">
          <img src="/images/image.png" alt="slide1" />
        </div>
        <div id="sliders">
          <img src="/images/mon.avif" alt="slide2" />
        </div>
        <div id="sliders">
          <img src="/images/jon.avif" alt="slide3" />
        </div>
        <div id="sliders">
          <img src="/images/kon.avif" alt="slide4" />
        </div>
      </Slider>
    </div>
  );
}

export default Sliders;
