import axios from "axios";
import { ADMIN_ORDER_FAIL, ADMIN_ORDER_REQUEST, ADMIN_ORDER_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "../constants/orderConstant";

//create order
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })

        const config = {
            headers: { "Content-Type": "application/json" }
        }
        const { data } = await axios.post("http://localhost:3000/api/v1/order/new", order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get logged in users order
export const myOrder = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDER_REQUEST })

        const { data } = await axios.get("http://localhost:3000/api/v1/orders/me")
        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get single order details
export const getSingleOrderDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { data } = await axios.get(`http://localhost:3000/api/v1/order/${id}`)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get orders list -- Admin
export const ordersAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ORDER_REQUEST })

        const { data } = await axios.get(`http://localhost:3000/api/v1/admin/orders`)

        dispatch({
            type: ADMIN_ORDER_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: ADMIN_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Update Order -- Admin
export const updateOrder = (id, updatedData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST })

        const config = {
            headers: { "Content-type": "application/json" }
        }

        const { data } = await axios.put(`http://localhost:3000/api/v1/admin/order/${id}`, updatedData, config)

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data
        })
    } catch {
        dispatch({ type: UPDATE_ORDER_FAIL })
    }
}

export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST })

        const { data } = await axios.delete(`http://localhost:3000/api/v1/admin/order/${id}`)

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({ type: DELETE_ORDER_FAIL })
    }
}

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}