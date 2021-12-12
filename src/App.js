import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from './components/Cart';
import { CartContext } from './CartContext';
import {useState, useEffect} from 'react';

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  
  useEffect(() => {
      const cart = window.localStorage.getItem('cart');
      const wishlist = window.localStorage.getItem('wishlist');
      if (cart) {
        setCart(JSON.parse(cart));
        }
        else{
          window.localStorage.setItem('cart', JSON.stringify(cart))
        }
      if (wishlist) {
        setWishlist(JSON.parse(wishlist));
        }
        else{
          window.localStorage.setItem('wishlist', JSON.stringify(wishlist))
        }
  }, [])

  useEffect(() => {
      window.localStorage.setItem('cart', JSON.stringify(cart))
      window.localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [cart,wishlist]);

  return (
    <>
    <Router>
    <CartContext.Provider value={{ cart, setCart, wishlist, setWishlist }}>
      <Header cart={cart} />
     <Switch>
     <Route path="/" component={Home} exact></Route>
      <Route path="/cart"><Cart /></Route>
      </Switch>
      </CartContext.Provider>
      </Router>
    </>
  );
}

export default App;
