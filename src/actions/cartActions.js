import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'


export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/books/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            book: data.id,
            title: data.title,
            image: data.image,
            price: data.price,
            count_in_stock: data.count_in_stock,
            quantity,
        }
    })

    localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItems))
}