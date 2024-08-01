import { NavLink } from "react-router-dom"
// import { Navbar } from "../Components/Navbar"
import "../css/Login.css"
// import { useEffect } from "react"
import axios from "axios";

export function Login(){
    
    // useEffect(()=>{
    //     console.log("Hey, how are you ?");
    // });
    async function custLogin(event){
        event.preventDefault();

        try{
            const username = document.getElementById("username").value;
            const pwd = document.getElementById("password").value;
            const res = await axios.post("https://fullstack-ecomm-backend-app.onrender.com/Login",
            {
                email : username,
                password : pwd
            },{
                withCredentials: true // Ensure cookies are sent
            });
            sessionStorage.setItem("token",res.data.token);
            
            window.location = "/";
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <div>
            <div className="login-container">
                <h2>Login</h2>
                {/* <form action="/Login" method="POST"> */}
                <form method="POST">
                    <input type="text" name="username" id="username" placeholder="Email or phone number" required/>
                    <input type="password" name="password" id="password" placeholder="Password" required/>
                    <button type="submit" onClick={custLogin}>Login</button>
                    <br></br><br></br>
                    <p id="dont-have-acc">Don't have an account ?</p>
                    <NavLink to="/Signup"><p id="btn-signup">Sign Up</p></NavLink>
                    <NavLink to="/"><p id="btn-home">&laquo;Home Page</p></NavLink>
                </form>
            </div>
        </div>
    )
}