import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from './components/Cart';
import { CartContext } from './CartContext';
import {useState, useEffect} from 'react';

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
      const cart = window.localStorage.getItem('cart');
      if (cart) {
        setCart(JSON.parse(cart));
        }
        else{
          window.localStorage.setItem('cart', JSON.stringify(cart))
        }
  }, [])

  useEffect(() => {
      window.localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]);

  return (
    <>
    <Router>
    <CartContext.Provider value={{ cart, setCart }}>
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
