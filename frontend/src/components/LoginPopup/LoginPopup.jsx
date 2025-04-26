import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import axios from "axios"
import { StoreContext } from '../../context/StoreContext';
const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "login") {
      newUrl += '/api/user/login'

    }
    else {
      newUrl += '/api/user/register'
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token)
      setShowLogin(false);
    }
    else{
      alert(response.data.message)
    }

  }
  const [currState, setCurrState] = useState("login");

  return (
    <div className='login-popup'>
      <form action="" onSubmit={onLogin} className="login-popup-conatiner">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {
            currState === "login" ? <></> : <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your Name' required />

          }
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter your Email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter your password' required />
        </div>
        <button type='submit'>{currState === "sign up" ? "create account" : "login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" name="" id="" required />
          <p>By continuing ,i agree to the terms of use and privacy policy.</p>
        </div>

        {currState === "login" ? <p>Create a new account?<span onClick={() => setCurrState("sign up")}>click here</span></p> : <p>Already have an account ?<span onClick={() => setCurrState("login")}>Login here</span></p>}

      </form>
    </div>
  )
}

export default LoginPopup
