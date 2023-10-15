import React, { useEffect, useState } from 'react';
import "./mainlayout.css"
import axios, { all } from "axios";

import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

import {message} from "antd";


const MainLayout = () => {
    
    const [messageApi, contextHolder] = message.useMessage();
    const [phoneNum,setPhoneNum] = useState("");
    const [data,setData] = useState();
    const [allUsers, setAllUsers]=useState([]);
    const navigate = useNavigate();

    const warnigF =()=>{
        messageApi.open({
            type: 'warning',
            content: "You already Loged in",
        });
    }
    const handleSubmit = () =>{
        setData(null)
        axios.get(`http://localhost:4010/users/${phoneNum}`)
            .then(response => {
                const posts = response.data;
                setData(posts);
            })
            .catch(err=>{
                const status = err.response.status; 
                const text = status==401?"Please write phone number":"Wrong phone number";
                messageApi.open({
                    type: 'warning',
                    content: text,})
            })
    }

    const token = Cookies.get("loginCookie");
    const getAllUsers = () =>{
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get(`http://localhost:4010/users`,config)
            .then(response => {
                setAllUsers(response.data);
                console.log(response);
            })
            .catch(err=>{
                console.log(err);
            })
    }
    useEffect(()=>{
        token?
        getAllUsers()
        :"";

    },[])

    const logout = () => {
        if(!token){navigate("/login")}
        else{ 
            Cookies.remove("loginCookie");
            navigate("/")
        }
    }

    return (
        <div className='mainDiv'>
            {contextHolder}
            <div style={{width:"calc(600px)", display:"flex", justifyContent:"center",alignItems:"center"}}>
            <button className='loginButton' onClick={logout}>{token ? "Log out" : "Log in"}</button>
                <input  className='numberInput' onChange={(e)=>setPhoneNum(e.target.value)} type="tel" placeholder='Write phone number' />
                <button className='submitButton' onClick={handleSubmit}>Submit</button>
             </div>
                {
                    data ? 
                        <div style={{display:"flex",width:"calc(100% - 180px)", flexDirection:"column", alignItems:"center", textAlign:"center",margin:"0 auto"}}>
                            
                            <div style={{width:"600px", display:"flex", justifyContent:"space-between", marginTop:"32px"}}>
                            <span className='username'>{data?.username?data.username:"noData"}</span>
                            <span className='count'>{`${data.count?data.cost:"0"} mnt`}</span>
                            </div>
                            <div style={{width:"calc(600px)", display:"flex"}}>
                                <input  className='downInput' type="input" placeholder='Amount of money' />
                                <button className='submitButton'>Send</button>
                            </div>
             </div>: ""
                }
                {
                    token?
                    <div style={{width:"600px"}}>
                        <ul>
                                    <li>
                                        <div style={{display:"flex", fontWeight:"bold", background:"none",margin:"0", padding:"0 16px" }}>
                                            <span style={{width:"150px"}}>Username</span>
                                            <span style={{width:"275px"}}>Email</span>
                                            <span style={{width:"175px"}}>Phone number</span>
                                            <span style={{width:"100px"}}>Count</span>
                                        </div>
                                    </li>
                            {
                                allUsers.map((item)=>(
                                    <li key={item.id}>
                                        <div style={{display:"flex", }}>
                                            <span style={{width:"150px"}}>{item.username}</span>
                                            <span style={{width:"275px"}}>{item.email}</span>
                                            <span style={{width:"175px"}}>{item.phone}</span>
                                            <span style={{width:"100px"}}>{item.count?item.count:0}</span>
                                        </div>
                                    </li>
                                    ))
                            }
                        </ul>
                        <button className='createBtn' onClick={()=>navigate("/createNew")}>Create New</button>
                    </div>:<></>
                }
        </div>

    );
  };
  
  export default MainLayout;