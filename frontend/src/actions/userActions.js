import axios from "axios"

export const login = (email, password) => async (dispatch) =>{
    try{
        dispatch({type: "USER_LOGIN_REQUEST"})

        const loginCredentials = {
            email: email,
            password: password
        }

        const config = {
            headers: {
                'Content-Type' : 'Application/json'
            }
        }
        const {data} = await axios.post('/api/users/login' , loginCredentials , config)

        dispatch({type: "USER_LOGIN_SUCCESS" , payload: data})
        
        localStorage.setItem('userInfo' , JSON.stringify(data))
    }

    catch(error){
        dispatch({type : 'USER_LOGIN_FAIL' ,
        payload: error.response && error.response.data.message ?
           error.response.data.message :
           error.message
       })

    }
}

export const logout = () => (dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({type : "USER_LOGOUT"})
}