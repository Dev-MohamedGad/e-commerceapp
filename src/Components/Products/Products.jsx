import React from 'react'
import { Helmet } from 'react-helmet'
import Loading from '../Loading'
import useApi from '../../hooks/useApi'
import { Link } from 'react-router-dom'

export default function Products() {
  let { data, isLoading } = useApi('products', 'products')
  if (isLoading)
    return <Loading></Loading>
  return (
    <div className='container'>
        <div className="row">


{data?.data.data.sort((a,b)=>b.ratingsAverage - a.ratingsAverage).slice(0,10).map((product) => <div className='col-lg-2 col-md-3 col-sm-6' key={product._id}>
    <div className="product p-3 cursor-pointer">
        <Link to={`productdetails/${product._id}`}>
            <img src={product.imageCover} className='w-100' alt="img" />
            <p className='text-main'>{product.category.name}</p>
            <p>{product.title.split(" ").slice(0, 2).join(" ")}</p>
            <div className="product-box d-flex justify-content-between">
                <span>{product.price} EGP</span>
                <span> <i className='fa-solid fa-star rating-color'></i> {product.ratingsAverage}</span>
            </div>
        </Link>
       
    </div>
</div>)
}
</div>
    
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products page</title>
      </Helmet>
    </div>
  )
}
