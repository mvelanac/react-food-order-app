import classes from './MealItemForm.module.css';
import Input from '../UI/Input';
import { useContext, useState, useRef } from 'react';
import CartContext from '../../store/cart-context';

const MealItemForm = (props) => {

    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    const cartCtx = useContext(CartContext);

    const handleSubmitMeal = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().lenth === 0 || enteredAmountNumber < 1 || enteredAmountNumber >5){
            setAmountIsValid(false);
            return;
        } 
        
        cartCtx.addItem({id: props.item.id,
        name: props.item.name,
        amount: enteredAmountNumber,
        description: props.item.description,
        price: props.item.price});
    };

    return (
        
        <form type='submit' onSubmit={handleSubmitMeal} className={classes.form}>
            <Input ref={amountInputRef}
                label='Amount' input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                sterp: '1',
                defaultValue: '1'
            }}/>
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter valid amount.</p>}
        </form>
        
    );
};

export default MealItemForm;