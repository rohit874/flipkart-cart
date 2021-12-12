import React from 'react';
import { CartContext } from "../CartContext";
import {useEffect, useState, useContext} from 'react';
import ProductData from '../data.json';

function Cart() {
    const { cart, setCart, wishlist, setWishlist } = useContext(CartContext);
    let products = ProductData;
    const [cartItems, setCartItems] = useState([]);
    const [wishListItems, setWishListItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

    useEffect(()=>{
        let Cart = products.filter((data)=>{
            return cart[data.id] !== undefined;
        });
        setCartItems(Cart);
    },[cart,products])


    useEffect(()=>{
        let count = 0;
        let countDiscount = 0;
        cartItems.forEach((data)=>{
            // count += data.price*cart[data.id];
            let discount = (data.discount / 100) * data.price;
            let percent = data.price - discount;
            countDiscount+=discount*cart[data.id];
            count += percent*cart[data.id];
        })
        setTotal(count);
        setTotalDiscount(countDiscount)
    },[cartItems,cart])

    useEffect(()=>{
        let wishlistNew = products.filter((data)=>{
            return wishlist.includes(data.id);
        });
        setWishListItems(wishlistNew);
    },[wishlist,products])



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
           delete _cart[item_id];
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

    const AddToWishlist = (item_id)=>{
        let _wishlist = [...wishlist];
        let indx = wishlist.indexOf(item_id);
        console.log(wishlist);
        if (indx<0) {
            setWishlist([..._wishlist,item_id]);
        }
        else{
           let newWishlist =  _wishlist.filter((data)=>data!==item_id)
            setWishlist(newWishlist);
        }
    }


    return (
        <div className='cart_parent'>
            <div className='checkout'>
            <span className='subtotal'>Total Items - {cartItems.length}</span>
            <span className='subtotal'>Total Discount  &#8377; {totalDiscount}</span>
            <span className='subtotal'>SubTotal  &#8377; {total}</span>
            </div>
        <div className='cart'>
        <h2 className="no_product">Cart Items</h2>
            {
                 cartItems.length ? cartItems.map((data)=>{
                    return(
                        <div key={data.id} className="cart_card">
                        <img src={data.image}  alt=""/>
                        <div className="cart_card_text">
                        <h3>{data.brand}</h3>
                        <h4>{data.title}</h4>
                        <h4>Price &#8377;{data.price}</h4>
                        <h4>Discount - {data.discount}%</h4>
                        <h4>Size - {data.size.map((size)=>size + " ")}</h4>
                        <button onClick={(e)=>{decrease(data.id)}}>-</button>
                        <span>{!cart[data.id]?0:cart[data.id]}</span>
                        <button onClick={(e)=>{AddToCart(data.id)}}>+</button>
                        <br />
                        <button onClick={(e)=>{RemoveFromCart(data.id)}}>Remove</button>
                        <button onClick={(e)=>{AddToWishlist(data.id);RemoveFromCart(data.id)}}>Add to Wishlist</button>
                        </div>
                    </div>
                    )
                }) :<h3 className="no_product">No Product found</h3>}

                <h2 className="no_product">Wishlist Items</h2>

            {
                 wishListItems.length ? wishListItems.map((data)=>{
                    return(
                        <div key={data.id} className="cart_card">
                        <img src={data.image}  alt=""/>
                        <div className="cart_card_text">
                        <h3>{data.brand}</h3>
                        <h4>{data.title}</h4>
                        <h4>Price &#8377;{data.price}</h4>
                        <h4>Discount - {data.discount}%</h4>
                        <h4>Size - {data.size.map((size)=>size + " ")}</h4>
                        <button onClick={(e)=>{AddToCart(data.id);AddToWishlist(data.id)}}>Add to Cart</button>
                        <br />
                        </div>
                    </div>
                    )
                }) :<h3 className="no_product">No Product found</h3>}
        </div>
        </div>
    )
}

export default Cart
