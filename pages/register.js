import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {toast} from 'react-toastify'
import {SyncOutlined} from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from "next/router";
import { Context } from "../context";


const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const {state, dispatch} = useContext(Context)

  const router = useRouter();

  useEffect(()=>{
    if(state.user !== null){
      router.push("/")
    }
  }, [state.user])
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true)
      const { data } = await axios.post(`/api/register`, {
      name: user.name,
      email: user.email,
      password: user.password,
    });

      toast.success("Account successfully created. please sign in to your account to enjoy exclusive access")
      setLoading(false)
    } catch (err) {
      toast.error(err.response.data)
      setLoading(false)
    }
  };

  return (
    <>
      <h3 className="jumbotron bg-primary text-center square">Register</h3>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Enter Your Name"
            name="name"
            className="form-control p-4 mb-4"
            value={user.name}
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="email"
            required
            placeholder="Enter Your Email"
            name="email"
            className="form-control p-4 mb-4"
            value={user.email}
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="password"
            required
            placeholder="Choose a Password"
            name="password"
            className="form-control p-4 mb-4"
            value={user.password}
            onChange={(e) => handleChange(e)}
          ></input>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-block btn-primary p-2" disabled={loading}>
              {loading? <SyncOutlined spin />:"Submit"}
            </button>
          </div>
        </form>

        <p className="text-center p-3">
          Already registered? 
          <Link href="/login"><a>Login here</a></Link>
        </p>
      </div>
    </>
  );
};

export default Register;
