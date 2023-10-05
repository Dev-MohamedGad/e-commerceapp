import React from 'react'

export default function Footer() {
    return (
        <div className='py-4 bg-main-light'>
             <div className="container">
             <h1 className='my-4'>Get the FreshCart App</h1>
            <p>we will Send you a link Lorem, ipsum dolor.</p>
            <div className="row my-3">
                <div className="col-md-9">
                    <input type="text" className='form-control' placeholder='Email' />
                </div>
                <div className="col-md-3">
                    <button className='form-control btn form-btn'>send a link</button>
                </div>
            </div>
                <hr />
             </div>
        </div>
    )
}
