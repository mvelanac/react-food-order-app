import CartIcon from '../Cart/CartIcon.js';
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context.js';

const HeaderCartButton = (props) => {

    const [btnIsBumped, setBtnIsBumped] = useState(false);
    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const numberOfChartItems = 
            items.reduce((currentNum, item)=>{return currentNum + item.amount}, 0);


    const btnClasses = `${classes.button} ${btnIsBumped? classes.bump : ''}`;

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnIsBumped(true);

        const timer = setTimeout(() => {
            setBtnIsBumped(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}><CartIcon/></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfChartItems}</span>
    </button>

};

export default HeaderCartButton;