import React from "react";
import foodImage from '../../assets/food.png';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton.js';
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Header = (props) => {

    return <React.Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header> 
        <div className={classes['main-image']}>
            <img src={foodImage} alt="A table full of food"/>
        </div>
    </React.Fragment>;
};

export default Header;