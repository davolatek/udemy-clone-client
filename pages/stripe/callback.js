import { useEffect, useContext } from "react";
import { Context } from "../../context";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";

const StripeCallback = () => {

    const {state:{user}, dispatch} = useContext(Context)

    useEffect(()=>{
        if(user){
            axios.post("/api/get-account-status",{userId: user._id}).then(res=>{
                
                // console.log(res)
                dispatch({
                    type:'LOGIN',
                    payload: res.data
                })

                window.localStorage.setItem('user', JSON.stringify(res.data))
                window.location.href="/instructor"
            })
        }
    },[user])

  return (
    
        <SyncOutlined spin className="d-flex justify-content-center text-danger display-1 p-5" />
    
  )
}

export default StripeCallback


