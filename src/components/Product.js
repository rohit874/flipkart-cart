import {useContext} from 'react';
import { CartContext } from "../CartContext";

const Product = ({data}) => {
    const { cart, setCart } = useContext(CartContext);

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
    return (
        <div className="product_card">
            <img src={data.image}  alt=""/>
            <div className="product_card_text">
            <h3>{data.brand}</h3>
            <h4>{data.title}</h4>
            <h4>Price &#8377;{data.price}</h4>
            <h4>Size - {data.size.map((size)=>size + " ")}</h4>
            {cart[data.id] !== undefined?<button>Added to Cart</button>:<button onClick={(e)=>{AddToCart(data.id)}}>Add to Cart</button>}
            </div>
        </div>
    )
}

export default Product
