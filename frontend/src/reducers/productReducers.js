

/*
* This code defines a Redux reducer function called `productListReducer`. It takes in two parameters: `state` and `action`. 
* The `state` parameter is an object with a property `products` set to an empty array by default. This object represents the initial state of the product list in the Redux store. 
* The `action` parameter represents the action dispatched by the application. The reducer function handles three types of actions: 
* - `PRODUCT_LIST_REQUEST`: This action is dispatched when the application is requesting a list of products. The reducer returns an object with a `loading` property set to `true` and the `products` array set to an empty array to indicate that the request is in progress.
* - `PRODUCT_LIST_SUCCESS`: This action is dispatched when the application successfully receives a list of products. The reducer returns an object with `loading` set to `false` and the `products` array set to the `payload` property of the action, which represents the list of products.
* - `PRODUCT_LIST_FAIL`: This action is dispatched when there is an error retrieving the list of products. The reducer returns an object with `loading` set to `false` and an `error` property set to the `payload` property of the action, which represents the error message.
* If none of the above actions match, the reducer returns the current `state` object as is.
*
* the object that this function returns is a SLICE of the global state calls "productList" and it look like this: {loading: Boolean , products : Array, error: Error}.
* it can be accessed by "state.productList" (the name productList was given to this object on the "combineReducers" constructor on "store.js" )
*/
export const productListReducer = (state = {products : [] } , action) =>{
    switch(action.type){
        case 'PRODUCT_LIST_REQUEST':
            return {loading : true , products: []}
        case 'PRODUCT_LIST_SUCCESS':
            return{loading: false , products: action.payload}
        case 'PRODUCT_LIST_FAIL':
            return{loading: false , error: action.payload}
        default:
            return state
    }
}

/*
* This code defines a Redux reducer function called `productDetailsReducer`. It takes in two parameters: `state` and `action`. 
* The `state` parameter is an object with a property `product` set to an object with an empty `reviews` array by default. This object represents the initial state of the product details in the Redux store. 
* The `action` parameter represents the action dispatched by the application. The reducer function handles three types of actions: 
* - `PRODUCT_DETAILS_REQUEST`: This action is dispatched when the application is requesting the details of a product. The reducer returns an object with a `loading` property set to `true` and the current `state` object to indicate that the request is in progress.
* - `PRODUCT_DETAILS_SUCCESS`: This action is dispatched when the application successfully receives the details of a product. The reducer returns an object with `loading` set to `false` and the `product` property set to the `payload` property of the action, which represents the product details.
* - `PRODUCT_DETAILS_FAIL`: This action is dispatched when there is an error retrieving the details of a product. The reducer returns an object with `loading` set to `false` and an `error` property set to the `payload` property of the action, which represents the error message.
* If none of the above actions match, the reducer returns the current `state` object as is.
*
* the object that this function returns is a SLICE of the global state calls "productDetails" and it look like this: {loading: Boolean , product : Object, error: Error}.
* it can be accessed by "state.productDetails" (the name productDetails was given to this object on the "combineReducers" constructor on "store.js" )
*/
export const productDetailsReducer = (state = {product : { reviews: [] } } , action) =>{
    switch(action.type){
        case 'PRODUCT_DETAILS_REQUEST':
            return {...state , loading : true }
        case 'PRODUCT_DETAILS_SUCCESS':
            return{ loadind: false , product: action.payload}
        case 'PRODUCT_DETAILS_FAIL':
            return{ loadind: false , error: action.payload}
        default:
            return state
    }
}