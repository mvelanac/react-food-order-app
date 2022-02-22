import logo from './logo.svg';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import { useState } from 'react';
import CartProvider from './store/CartProvider';

function App() {

  const[cartIsVisible, setCartIsVisible] = useState(false);

  const showCartHandler = () => {
    setCartIsVisible(true);
  };

  const hideCartHandler = () => {
    setCartIsVisible(false);
  };

  return (
   <CartProvider>
     {cartIsVisible && <Cart onClose={hideCartHandler}/>}
     <Header onShowCart={showCartHandler}></Header>
     <main>
       <Meals></Meals>
     </main>
    </CartProvider>
  );
}

export default App;
