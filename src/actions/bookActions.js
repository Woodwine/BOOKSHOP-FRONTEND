import {
    BOOK_LIST_REQUEST,
    BOOK_LIST_SUCCESS,
    BOOK_LIST_FAIL,

    BOOK_DETAILS_REQUEST,
    BOOK_DETAILS_SUCCESS,
    BOOK_DETAILS_FAIL,

    BOOK_DELETE_REQUEST,
    BOOK_DELETE_SUCCESS,
    BOOK_DELETE_FAIL,

} from '../constants/bookConstants'
import axios from 'axios'


export const listBooks = () => async (dispatch) => {
    try {
        dispatch({ type: BOOK_LIST_REQUEST });

        const { data } = await axios.get('/api/v1/books/');

        dispatch({
            type: BOOK_LIST_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: BOOK_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listBookDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: BOOK_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/books/${id}`);

        dispatch({
            type: BOOK_DETAILS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: BOOK_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteBook = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BOOK_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/v1/books/${id}`,
            config
        );

        dispatch({
            type: BOOK_DELETE_SUCCESS,
        });

    } catch (error) {
        dispatch({
            type: BOOK_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}