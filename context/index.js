import {useReducer, createContext, useEffect} from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';


// initial State
const initialState = {
    user: null
}


// create context

const Context = createContext();



// root reducer

const rootReducer = (state, action) =>{
    switch(action.type){
        case "LOGIN":
            return {...state, user: action.payload}
        case "LOGOUT":
            return {...state, user: null}

        default:
            return state;
    }
}


const Provider = ({children}) =>{
    const [state, dispatch] = useReducer(rootReducer, initialState)

    const router = useRouter()

    useEffect(()=>{
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem('user'))
        })
    },[])

    axios.interceptors.response.use(

        // 2XX response codes are triggered in this function
        function(response){
            return response
        },

        // 4XX, 5XX response codes are trigerred in the following function
        function(error){
            const res = error.response

            if(res.status === 401 && res.config && !res.config.__isRetryRequest){
                return new Promise((resolve, reject)=>{
                    axios.get("/api/logout").then(data=>{
                        dispatch({
                            type:"LOGOUT"
                        })

                        window.localStorage.clear()
                        router.push("/login")
                    }).catch(err=>{
                        console.log("AXIOS INTERCEPTOR ERROR", err)
                        resolve(error);
                    })
                })
            }

            return Promise.reject(error)
        }
    )


    useEffect(()=>{
        const getCSRFToken = async () =>{
            const {data} = await axios.get("/api/csrf-token")

            console.log("CSRF", data.csrfToken)

            axios.defaults.headers["X-CSRF-Token"] = data.csrfToken
        }

        getCSRFToken()
    })

    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}


export {Context, Provider}