import React, { useEffect, useState } from "react";
import Image from "../assets/image.png";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios';

const SignUp = () => {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);

  const [ showPassword, setShowPassword ] = useState(false);
  const [ valid, setValid ] = useState(false);
  const navigate = useNavigate();


  const validPassword = (val) => {

    const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(passRegex.test(val)) {
      setValid(true)
      setPass(val)
    }
    else {
      setValid(false)
      setPass(val)
    }
  }


  const onSubmit = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(emailRegex.test(email) && passRegex.test(pass) && name) {
      console.log("This", email, pass, name)

      const req = async ()=>{

        const rsp = await axios.post("http://localhost:3001/auth/register",{
          username:email,
          password:pass,
          name: name
        })
          console.log("Resp", rsp);
          if(rsp){
            NotificationManager.success("Account created Successfully")
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
            <h2>Create an Account!</h2>
            <p>Enter all your details</p>
            <form>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <div className="pass-input-div">
                  <input type={showPassword ? "text" : "password"} placeholder="Password" value={pass} onChange={(e) => validPassword(e.target.value)} style={{ color: valid ? 'green' : 'red' }} />
                  {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="button" onClick={() => onSubmit()}>Sign Up</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Already have an account? <a onClick={() => navigate('/')}>Login</a>
          </p>
        </div>
      </div>
      <NotificationContainer/>
    </div>
  );
};

export default SignUp;
