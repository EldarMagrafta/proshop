import axios from 'axios'

/*
this function is a 'Action creator" function. it returns an async thunk function (lets call it "foo") that sends a request to the backend to fetch the product details with the given id.
If the request is successful, the function creates an item object that represents the product with the qty the user wants to add,
and then dispatches an action of type "CART_ADD_ITEM" with this item as payload.
Finally, the function stores the cart state in the browser's local storage using localStorage.setItem.
*/
export const addToCart = (id, qty) => async(dispatch, getState)=> {
    const {data} = await axios.get(`/api/products/${id}`)
    const item = {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: qty
        // qty: Number(qty)
   }
    dispatch({type : "CART_ADD_ITEM" , payload: item})
    /*
    This line retrieves the current state of the cart slice of the Redux store using the getState() method 
    and then serializes the cartItems array to a JSON string using JSON.stringify(). 
    The resulting JSON string is then stored in the localStorage object under the key 'cartItems'.
    The purpose of this line is to persist the cart state across page refreshes and user sessions, 
    so that the user's cart contents are preserved even if they navigate away from the site and come back late
    */
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch , getState) =>{
    dispatch({type: "CART_REMOVE_ITEM" , payload: id})
    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) =>{
    dispatch({type: "CART_SAVE_SHIPPING_ADDRESS" , payload: data})
    localStorage.setItem('shippingAddress' , JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) =>{
    dispatch({type: "CART_SAVE_PAYMENT_METHOD" , payload: data})
    localStorage.setItem('paymentMethod' , JSON.stringify(data))
}


    