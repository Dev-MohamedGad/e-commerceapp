import React from 'react'
import useApi from '../../hooks/useApi'
import Loading from '../Loading'

export default function Brand() {
  let { data, isLoading } = useApi('brands', 'brands')
  if (isLoading)
    return <Loading></Loading>
  return (
    <div className='container'>
      <div className="row">
        {data?.data.data.map((brand) => <div key={brand._id} className='text-center col-md-2'>
          <img src={brand.image} className='w-100' alt="brand" />
          <p className='fw-bolder'>{brand.name}</p>
        </div>)}
      </div>
    </div>


  )
}
