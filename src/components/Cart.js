import React from 'react';
import { CartContext } from "../CartContext";
import {useEffect, useState, useContext} from 'react';
import ProductData from '../data.json';

function Cart() {
    const { cart, setCart } = useContext(CartContext);
    let products = ProductData;
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        let Cart = products.filter((data)=>{
            return cart[data.id] !== undefined;
        });
        setCartItems(Cart);
    },[cart,products])


    useEffect(()=>{
        let count = 0;
        cartItems.forEach((data)=>{
            count += data.price*cart[data.id];
        })
        setTotal(count);
    },[cartItems,cart])



    const AddToCart = (item_id)=>{
        let _cart = {...cart};
        if (_cart[item_id]) {
            _cart[item_id] += 1;
        }
        else{
                _cart[item_id] = 1;
        }
        setCart(_cart);
    }
    const decrease = (item_id)=>{
        let _cart = {...cart};
        if (_cart[item_id]<=1) {
            _cart[item_id]=0;
        }
        else{
            _cart[item_id] -= 1;
        }
        setCart(_cart);
    }
    const RemoveFromCart = (item_id)=>{
        let _cart = {...cart};
        if (_cart[item_id]>=0) {
            delete _cart[item_id];
        }
        setCart(_cart);
    }


    return (
        <div className='cart'>
            <span className='subtotal'>Total Items - {cartItems.length}</span>
            <span className='subtotal'>SubTotal - &#8377;{total}</span>
            {
                 cartItems.length ? cartItems.map((data)=>{
                    return(
                        <div key={data.id} className="cart_card">
                        <img src={data.image}  alt=""/>
                        <div className="cart_card_text">
                        <h3>{data.brand}</h3>
                        <h4>{data.title}</h4>
                        <h4>Price &#8377;{data.price}</h4>
                        <h4>Size - {data.size.map((size)=>size + " ")}</h4>
                        <button onClick={(e)=>{decrease(data.id)}}>-</button>
                        <span>{!cart[data.id]?0:cart[data.id]}</span>
                        <button onClick={(e)=>{AddToCart(data.id)}}>+</button>
                        <br />
                        <button onClick={(e)=>{RemoveFromCart(data.id)}}>Remove</button>
                        </div>
                    </div>
                    )
                }) :<h3 className="no_product">No Product found</h3>}
        </div>
    )
}

export default Cart
