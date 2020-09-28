import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, pd) => total + pd.price*pd.quantity,0)
    let shipping = 0;
    if (total >35){
        shipping = 0;
    }
    else if (total >15 ){
        shipping = 4.99;
    }
    else if (total >0){
        shipping = 12.99;
    }
    const tax = (total / 10).toFixed(2);
    const totalP = (total).toFixed(2);
    const grandTotal = (total+ shipping+ Number(tax)).toFixed(2);
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Orders: {cart.length}</p>
            <p>Product Price: {totalP}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + VAT: {tax}</small></p>
             <p>Total price: {grandTotal}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;