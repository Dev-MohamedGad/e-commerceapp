import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Slider from "react-slick";
export default function CategorySlider() {



    const BaseUrl = 'https://ecommerce.routemisr.com'
  
    function getData()
    {
        return axios.get(`${BaseUrl}/api/v1/categories`)
    }

    const {data}= useQuery('categories',getData)
   

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000
      };


  return (
    
  <div className="container d-md-block d-none my-3">
    <h2 className='h4 my-4'>Shop Popular Category</h2>
    <Slider {...settings} className='my-4'>
        {data?.data.data.map((cat)=>
       ( <>
        <img key={cat.image}  className='w-100 cat' src={cat.image} alt='img'></img>
        <p>{cat.name}</p> 
        </>)
        )}
    </Slider>
  </div>

  )
}
