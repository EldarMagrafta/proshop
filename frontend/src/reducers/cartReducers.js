/*
cartItems is a property of the state object that represents the current state of a shopping cart
cartItems is array of objects. each object there has a property named "product" that described the electronic product itself
*/
export const cartReducer = (state = {cartItems: []}, action) =>{
    switch(action.type){
        case "CART_ADD_ITEM":
            const item = action.payload
            //check if the electronic product is already in the cart (here the word "state" referce to the slice of the Redux store named "cart")
            const existItem = state.cartItems.find(x=>x.product === item.product)
            if(existItem){
                //Update the cart by replacing the existing item with the new item
                return {...state , cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)}
            }
            else{
                //Add the item to the cartItems array
                return {...state , cartItems:[...state.cartItems , item ]}
            }
        case "CART_REMOVE_ITEM":
            //for each item in cartItems, keep it if its id (x.product) is not equal to action.payload
            return {...state , cartItems: state.cartItems.filter(x => x.product !== action.payload)}

        default:
                return state
    }

}