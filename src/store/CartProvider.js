import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD_ITEM'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = [...state.items, action.item];
        }

        return {items:updatedItems, totalAmount: updatedTotalAmount};
    } else if (action.type === 'REMOVE_ITEM'){
        const removeItemIndex = state.items.findIndex((item) => item.id === action.id);
        const removeItem = state.items[removeItemIndex];
        
        const updatedTotalAmount = state.totalAmount - removeItem.price;

        const removeItemAmount = removeItem.amount;
        
        let updatedItems;
        if(removeItemAmount === 1){
            updatedItems = state.items.filter((item) => action.id !== item.id);
        } else if(removeItemAmount > 1){
            updatedItems = [...state.items];
            updatedItems[removeItemIndex] = {...removeItem, amount: removeItemAmount - 1};
        }

        return {items: updatedItems, totalAmount: updatedTotalAmount};
    } else return defaultCartState;
};

const CartProvider = (props) => {
        
    const[cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToChartHandler = (item) => {
        dispatchCartAction({type: 'ADD_ITEM', item: item});
    };

    const removeItemFromChartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE_ITEM', id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToChartHandler,
        removeItem: removeItemFromChartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;