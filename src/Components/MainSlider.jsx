import React from 'react'
import Slider from "react-slick";
import slide1  from '../assets/images/slider-image-1.jpeg'
import slide2  from '../assets/images/slider-image-2.jpeg'
import slide3  from '../assets/images/slider-image-3.jpeg'
import image1  from '../assets/images/grocery-banner.png'
import image2  from '../assets/images/grocery-banner-2.jpeg'
let sliders =[slide1,slide2,slide3]
export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:2000
      };
  return (
    <div className='container  d-md-block d-none '>
        <div className="row gx-0">
            <div className="col-lg-10 col-md-12">
            <Slider {...settings} >
              {sliders.map((img)=><img key={img} height={400} alt='img'  src={img}></img> )}
            </Slider>
            </div>
            <div className="col-lg-2 d-lg-block  d-none">
                <img src={image1} height={200} className='w-100' alt="img" />
                <img src={image2}  height={200} className="w-100" alt="img" />
            </div>
        </div>
    </div>
  )
}
