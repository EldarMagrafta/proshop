import { createStore , combineReducers , applyMiddleware } from 'redux'
// import { configureStore } from '@reduxjs/toolkit';

import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer , productDetailsReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer} from './reducers/userReducers.js'
import {orderCreateReducer, orderDetailsReducer} from './reducers/orderReducers.js'

//This is JavaScript code that creates a Redux store, which is used to manage the state of an application



/*
'productList' is used to identify the slice of the Redux store's state that the productListReducer is responsible for. 
This means that any updates to the productList slice of the state will be handled by the productListReducer.
all the above is true for every reducer in the combine reducer
when an action is dispatched, the Redux store calls ALL the reducers that were combined using the combineReducers function. 
Each reducer checks if the action matches any of its cases, and if it does, the reducer updates the relevant part of the state and returns the new state object.
*/
const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
})


/*
This code is useful for initializing the state of a Redux store with data that is persisted across browser sessions.
By storing data in localStorage, the data is preserved even if the user closes their browser or navigates away from the website.
When the user returns to the website, the data is retrieved from localStorage and used to initialize the state of the Redux store.
*/
const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
                                JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
                                JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
                                JSON.parse(localStorage.getItem('shippingAddress')) : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? 
                                JSON.parse(localStorage.getItem('paymentMethod')) : 'PayPal'
                                
const initialState = {
    cart : {cartItems : cartItemsFromStorage, shippingAddress: shippingAddressFromStorage, paymentMethod: paymentMethodFromStorage},
    userLogin: {userInfo : userInfoFromStorage},

}

//the thunk middleware is added to the middleware array.
const middleware = [thunk]

//This line creates a Redux store using the createStore function, passing in the reducer, initialState, and composeWithDevTools(applyMiddleware(...middleware)). 
//The applyMiddleware(...middleware) applies the thunk middleware to the store. The composeWithDevTools function enhances the debugging capabilities of the store.
const store = createStore(reducer , initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;