import axios from 'axios'

/*
* This code defines a Redux action creator function called `listProducts` (In Redux, an action creator function is a function that returns an action object that describes what happened in the application). 
* It returns an async function that takes in a `dispatch` function as a parameter, which is used to dispatch actions to the Redux store. 
* Inside the async function, it first dispatches a `PRODUCT_LIST_REQUEST` action to indicate that the product list is being requested.
* Then, it makes an HTTP GET request to `/api/products` using `axios`, and extracts the data from the response using destructuring. 
* It then dispatches a `PRODUCT_LIST_SUCCESS` action with the `data` as the `payload`.
* If there is an error during the HTTP request, it dispatches a `PRODUCT_LIST_FAIL` action with an error message as the `payload`. 
* The error message is obtained by checking if the error has a `response` property with a `data` property containing a `message` field, otherwise it uses the error message itself.
* This `listProducts` function is used to retrieve the list of products from a server and store them in the Redux store. 
* The Redux reducer function `productListReducer` is used to handle the dispatched actions and update the `products` array in the Redux store accordingly.
*/
export const listProducts = (keyword = '', pageNumber='') => async (dispatch)=>{
    try{
        dispatch({type : 'PRODUCT_LIST_REQUEST'})
        const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        dispatch({type : 'PRODUCT_LIST_SUCCESS' , payload: data})
    }
    catch(error){
        dispatch({type : 'PRODUCT_LIST_FAIL' ,
                 payload: error.response && error.response.data.message ?
                    error.response.data.message :
                    error.message
                })
    }
}



export const listProductDetails = (id) => async (dispatch)=>{
    try{
        dispatch({type : 'PRODUCT_DETAILS_REQUEST'})
        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({type : 'PRODUCT_DETAILS_SUCCESS' , payload: data})
    }
    catch(error){
        dispatch({type : 'PRODUCT_DETAILS_FAIL' ,
                 payload: error.response && error.response.data.message ?
                    error.response.data.message :
                    error.message
                })
    }
}


export const deleteProduct = (id) => async (dispatch, getState) =>{
    try{
        dispatch({type: "PRODUCT_DELETE_REQUEST"})

        const userLogin = getState().userLogin;
        const userInfo = userLogin.userInfo;

        const config = {
            headers: {
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)

        dispatch({type: "PRODUCT_DELETE_SUCCESS"})
    }
    catch(error){
        dispatch({type : "PRODUCT_DELETE_FAIL" ,
        payload: error.response && error.response.data.message ?
           error.response.data.message :
           error.message
       })

    }
}


export const createProduct = () => async (dispatch, getState) =>{
    try{
        dispatch({type: "PRODUCT_CREATE_REQUEST"})

        const userLogin = getState().userLogin;
        const userInfo = userLogin.userInfo;

        const config = {
            headers: {
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }
        //passing an empty object as request body because its a post request, but we dont have data to pass to it
        const {data} = await axios.post(`/api/products`, {}, config)

        //data is an object of a sample product. we pass this sample product as payload
        dispatch({type: "PRODUCT_CREATE_SUCCESS", payload: data})
    }
    catch(error){
        dispatch({type : "PRODUCT_CREATE_FAIL" ,
        payload: error.response && error.response.data.message ?
           error.response.data.message :
           error.message
       })
    }
}


export const updateProduct = (product) => async (dispatch, getState) =>{
    try{
        dispatch({type: "PRODUCT_UPDATE_REQUEST"})

        const userLogin = getState().userLogin;
        const userInfo = userLogin.userInfo;

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.put(`/api/products/${product._id}`, product, config)

        //data is the updated products object
        dispatch({type: "PRODUCT_UPDATE_SUCCESS", payload: data})
    }
    catch(error){
        dispatch({type : "PRODUCT_UPDATE_FAIL" ,
        payload: error.response && error.response.data.message ?
           error.response.data.message :
           error.message
       })
    }
}


export const createProductReview = (productId, review) => async (dispatch, getState) =>{
    try{
        dispatch({type: 'PRODUCT_CREATE_REVIEW_REQUEST'})

        const userLogin = getState().userLogin;
        const userInfo = userLogin.userInfo;

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }
    
        await axios.post(`/api/products/${productId}/reviews`, review, config)

        //data is the updated products object
        dispatch({type: 'PRODUCT_CREATE_REVIEW_SUCCESS'})
    }
    catch(error){
        dispatch({type : 'PRODUCT_CREATE_REVIEW_FAIL' ,
        payload: error.response && error.response.data.message ?
           error.response.data.message :
           error.message
       })
    }
}

export const listTopProducts = () => async (dispatch)=>{
    try{
        dispatch({type : 'PRODUCT_TOP_REQUEST'})
        const {data} = await axios.get('/api/products/top')
        dispatch({type : 'PRODUCT_TOP_SUCCESS' , payload: data})
    }
    catch(error){
        dispatch({type : 'PRODUCT_TOP_FAIL' ,
                 payload: error.response && error.response.data.message ?
                    error.response.data.message :
                    error.message
                })
    }
}