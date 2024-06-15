import "../css/Navbar.css";
import stackIcon from "../assets/icons/stack.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import cust from "../assets/icons/cust3.png"

export function Navbar(){

    const [ token, setToken ] = useState();

    useEffect(()=>{
        const token = sessionStorage.getItem("token");
        if(token != null){
            setToken(token);
            // const auth_btn = document.getElementById("auth-btn");
            // auth_btn.style.display = "none";
        }
    },[]);

    return(
        <div>
            <nav>
                <div id="logo">
                    <h1>Logo</h1>
                </div>
                <div id="menu">
                    <NavLink to="/"><p>Home</p></NavLink>
                    <NavLink to="/Best-Deals"><p>Best Deals</p></NavLink>
                    {/* <p>Mens</p>
                    <p>Womens</p>
                    <p>Kids</p> */}
                    <NavLink to="/Collection"><p>Collection</p></NavLink>
                    <NavLink to="/Orders"><p>Orders</p></NavLink>
                </div>
                {
                    token ? (<div id="profile"><img src={cust}></img></div>):(<div id="auth-btn">
                        <NavLink to="/Login"><button>Login</button></NavLink>
                        <NavLink to="/Signup"><button>Signup</button></NavLink>
                    </div>)
                }
                <div id="stack-cont">
                    <img src={stackIcon}/>
                </div>
            </nav>
        </div>
    )
};