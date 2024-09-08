import React, { useEffect, useState } from "react";
import Image from "../assets/image.png";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios';

const Login = () => {

  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);

  const [ showPassword, setShowPassword ] = useState(false);
  const navigate = useNavigate();


  const onSubmit = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailRegex.test(email) && pass) {
      console.log("This", email, pass)

      const req = async ()=>{

        const rsp = await axios.post("http://localhost:3001/auth/login",{
          username:email,
          password:pass
        })
          console.log("Resp", rsp);
          if(rsp){
            NotificationManager.success("Logged in Successfully")
          }
          else { NotificationManager.warning('Something went wrong') }
      }
      req()

    }
    else {
      NotificationManager.warning("Credentails Not Valid")
    }
  }

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your credentials</p>
            <form>
              <input type="email" placeholder="Email" pattern="[^ @]*@[^ @]*" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
                {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
                
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember me
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="button" onClick={() => onSubmit()}>Log In</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <a onClick={() => navigate('/signup')}>Sign Up</a>
          </p>
        </div>
      </div>
      <NotificationContainer/>
    </div>
  );
};

export default Login;
