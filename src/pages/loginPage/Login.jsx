import { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import "./login.css"

import {message} from "antd";

function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useState(0);
  const [password, setPassword] = useState(0);
  const navigate = useNavigate();

  const handleLogin =()=>{
    axios.post(`http://localhost:4010/login`,{
        username,
        password,
    })
    .then(response => {
        const posts = response.data;
        Cookies.set("loginCookie", posts.token)
        navigate("/")
    })
    .catch(err=>{
        console.log(err);
        
        const status = err.response.status;
        const text = status==401?"Wrong phone username and password":"Write username and password";
        messageApi.open({
            type: 'warning',
            content: text,})
    })
  }
  return (
    <div className='mainDivLogin'>
      {contextHolder}
    <div>
        <input placeholder='Enter username' type="text" onChange={(e)=>setUsername(e.target.value)}/>    
        <input placeholder='Enter password' type="password" onChange={e=>setPassword(e.target.value)}/>    
        <button className='loginBtn' onClick={handleLogin}>Log In</button>
        <button className='loginBtn' onClick={()=>navigate("/")}>Cancel</button>
    </div>
    </div>
  )
}

export default Login;
