import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) =>{
    try{
        dispatch({type: "ORDER_CREATE_REQUEST"})

        const userLogin = getState().userLogin;
        const userInfo = userLogin.userInfo;

        const config = {
            headers: {
                'Content-Type' : 'Application/json',
                'Authorization' : `Bearer ${userInfo.token}`
            },
        }

        // order.paymentMethod = 'PayPal'
        const {data} = await axios.post("/api/orders", order, config)

        dispatch({type: "ORDER_CREATE_SUCCESS" , payload: data})
    }
    catch(error){
        dispatch({type : "ORDER_CREATE_FAIL" ,
        payload: error.response && error.response.data.message ?
           error.response.data.message :
           error.message
       })

    }
}