import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import HappyImage from '../../images/giphy.gif';
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd =>pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const sevedCart = getDatabaseCart();
        const productKeys = Object.keys(sevedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = sevedCart[key];
            return product
        })
        setCart(cartProducts);
    },[])
    let thankyou;
    if(orderPlaced){
        thankyou= <img src={HappyImage} alt=""/>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem 
                    removeProduct={removeProduct}
                    key={pd.key}
                    product={pd}
                    ></ReviewItem>)
                    
            }
            {thankyou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className='button'>Place Order</button>
                </Cart>

            </div>
        </div>
    );
};

export default Review;