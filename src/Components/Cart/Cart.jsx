import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { UserToken } from '../../Context/UserToken'
import Loading from '../Loading'
import cartimg from '../../assets/preview.png'
import { Box, Modal } from '@mui/material'
import { useFormik } from 'formik'


export default function Cart() {
  

  let { getCart, deleteCart, updateCart, setCartNums, checkout, cartId, setCartId  } = useContext(CartContext)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function SubmitForm(values) {

    let res = await checkout(cartId, values)
    if (res?.data.status === 'success')
      window.location.href = res?.data.session?.url
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: SubmitForm
  })


  let { isLogin ,idowner, setidowner } = useContext(UserToken)
  let [data, setData] = useState(null)
  let [loading, setLoading] = useState(false)


  async function getCartFun() {
    setLoading(true)
    let res = await getCart()
    if (res?.data?.status === 'success') {
localStorage.setItem('idonwer',res.data.data.cartOwner)
      setData(res?.data)
      setCartId(res.data.data._id);
      setCartNums(res?.data.numOfCartItems);
      setLoading(false)
    }
    setLoading(false)
  }

  async function deleteCartFun(id) {
    let res = await deleteCart(id)
    if (res.data.status === 'success') {
      setData(res?.data)
      setCartNums(res?.data.numOfCartItems);
    }
  }
  async function updateCartFun(id, count) {
    if (count == 0)
      deleteCartFun(id)
    else {
      let res = await updateCart(id, count)
      if (res.data.status === 'success') {
        setData(res?.data)
        setCartNums(res?.data.numOfCartItems);
      }
    }
  }





  useEffect(() => {
    if (isLogin == null)
      return
    getCartFun()
  }, [isLogin])

  if (loading)
    return <div className='container '>
      <h3 className='my-3 text-left'>your cart is loading ...</h3>
      <Loading></Loading>
    </div>
  return (
    <div className='container'>

      {!data?.data.totalCartPrice ? <div className='text-center'>
        <p className='text-start fw-bold'>your cart is empty</p>
        <img src={cartimg} alt="img" />
      </div> : <div>
        <h3 className='h4 my-3'>{'total cart Price ' + data?.data.totalCartPrice}</h3>
        <div className="cart-box p-3 bg-main-light  my-2">
          <h2>Shop Cart</h2>
          {data?.data.products.map((prod) => <div key={prod.product._id} className='row align-items-center justify-content-between '>
            <div className="col-md-8">
              <div className="row my-3 align-items-center ">
                <div className="col-md-2">
                  <img src={prod.product.imageCover} className='w-100' alt="img" />
                </div>
                <div className="col-md-10">
                  <p>{prod.product.title}</p>
                  <p className='text-main'>{prod.price}</p>
                  <span className='cursor-pointer' onClick={() => { deleteCartFun(prod.product._id) }}> <i className='fa-solid fa-trash text-main'></i> Remove </span>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex justify-content-end">
              <button className='btn text-main border border-1 border-success p-1' onClick={() => { updateCartFun(prod.product._id.toString(), prod.count + 1) }}>+</button>
              <span className='mx-2'>{prod.count}</span>
              <button className='btn text-main border border-1 border-success p-1' onClick={() => { updateCartFun(prod.product._id, prod.count > 0 ? prod.count - 1 : 0) }}>-</button>
            </div>
          </div>)}
        </div>

        <button className='bg-main text-white my-3 btn' onClick={handleOpen}>Check out</button>

      </div>}
      {/* modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <input type="text" className='form-control my-2' name='details' onChange={formik.handleChange} value={formik.values.details} placeholder='address ' />
            <input type="tel" className='form-control my-2' name='phone' onChange={formik.handleChange} value={formik.values.phone} placeholder='phone ' />
            <input type="text" className='form-control my-2' name='city' onChange={formik.handleChange} value={formik.values.city} placeholder='city ' />
            <button className='btn bg-main text-white' type='submit'>send</button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}
