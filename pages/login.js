import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Get Access to the global state
  const { state, dispatch } = useContext(Context);
  

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
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email: user.email,
        password: user.password,
      });

      console.log(data)
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      // save to local storage

      window.localStorage.setItem("user", JSON.stringify(data));

      setLoading(false);

      // redirect the user

      router.push("/user");
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="jumbotron bg-primary text-center square">Login</h3>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="btn btn-block btn-primary p-2"
              disabled={loading}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </div>
        </form>

        <p className="text-center p-3">
          Don't have an Account?
          <Link href="/register">
            <a>Register here</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
