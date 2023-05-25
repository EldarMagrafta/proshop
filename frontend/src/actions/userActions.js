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
                'Content-Type' : 'application/json'
            }
        }
        /*
        "/api/users/login" is the endpoint URL for the HTTP request.
        "loginCredentials" is the data to be sent as the request body.
        "config" is an object containing request configuration options.
        */
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

export const logout = (navigate) => (dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({ type: "USER_DETAILS_RESET" })
    dispatch({type : "USER_LOGOUT"})
    navigate('/') //after logout, move user to homepage
}


export const register = (name, email, password) => async (dispatch) =>{
    try{
        dispatch({type: "USER_REGISTER_REQUEST"})

        const RegistrationCredentials = {
            name : name,
            email: email,
            password: password
        }

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const {data} = await axios.post('/api/users' , RegistrationCredentials , config)

        dispatch({type: "USER_REGISTER_SUCCESS" , payload: data})

        //so the user will be logged-in right after his registration
        dispatch({type: "USER_LOGIN_SUCCESS" , payload: data})

        
        localStorage.setItem('userInfo' , JSON.stringify(data))
    }

    catch(error){
        dispatch({type : 'USER_REGISTER_FAIL' ,
        payload: error.response && error.response.data.message ?
           error.response.data.message :
           error.message
       })

    }
}

export const getUserDetails = (id) => async (dispatch, getState) =>{
    try{
        dispatch({type: "USER_DETAILS_REQUEST"})

        const userLogin = getState().userLogin;
        const userInfo = userLogin.userInfo;

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.get(`/api/users/${id}`, config)

        dispatch({type: "USER_DETAILS_SUCCESS" , payload: data})
    }
    catch(error){
        dispatch({type : 'USER_DETAILS_FAIL' ,
        payload: error.response && error.response.data.message ?
           error.response.data.message :
           error.message
       })

    }
}

export const updateUserProfile = (user) => async (dispatch, getState) =>{
    try{
        dispatch({type: "USER_UPDATE_PROFILE_REQUEST"})

        const userLogin = getState().userLogin;
        const userInfo = userLogin.userInfo;

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.put("/api/users/profile", user, config)

        dispatch({type: "USER_UPDATE_PROFILE_SUCCESS" , payload: data})
    }
    catch(error){
        dispatch({type : "USER_UPDATE_PROFILE_FAIL" ,
        payload: error.response && error.response.data.message ?
           error.response.data.message :
           error.message
       })

    }
}