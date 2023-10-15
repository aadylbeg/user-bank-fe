import { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import {message} from "antd";

import "./createNew.css"


function CreateNew() {
    const [messageApi, contextHolder] = message.useMessage();
    const [username, setUsername]= useState();
    const [password, setPassword]= useState();
    const [email, setEmail]= useState();
    const [phone, setPhone]= useState();

  const navigate = useNavigate();

  const handleAddNewUser =()=>{ 
    const token = Cookies.get("loginCookie");

    const url = 'http://localhost:4010/users';

    const headers = {
         'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const data = {
        username,
        password,
        email,
        phone,
    };

axios.post(url, data, { headers })
  .then(response => {
    messageApi.open({
        type: 'success',
        content: 'This is a success message',
    });
    navigate("/");
  })
  .catch(err => {
    console.log(err);
    messageApi.open({
        type: 'warning',
        content: err.response.data.message,
    });
  });
  }

  return (
    <div style={{width:"100vw",height:"100vh",margin:"0", display:"flex",justifyContent:"center",alignItems:"center" }}>
      <div className='mainDivN'>
        {contextHolder}
        <input className='usernameN' type="text" placeholder='Enter username' onChange={(e)=>setUsername(e.target.value)}/>
        <input className='passwordN' type="password" placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)}/>
        <input className='emailN' type="text" placeholder='Enter email'onChange={(e)=>setEmail(e.target.value)}/>
        <input className='phoneN' type="text" placeholder='Enter phone number'onChange={(e)=>setPhone(e.target.value)}/>
        <button className='buttonN' onClick={()=>handleAddNewUser()}>Add new user</button>
        <button className='buttonN' onClick={()=>navigate("/")}>Cancel</button>
    </div>
    </div>
  )
}

export default CreateNew;
