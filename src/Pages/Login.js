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
            const res = await axios.post("https://fullstack-ecomm-backend-app.onrender.com/Login",
            {
                email : "jignesh@gmail.com",
                password : "jig123"
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
                <form onSubmit={custLogin} method="POST">
                    <input type="text" name="username" placeholder="Email or phone number" required/>
                    <input type="password" name="password" placeholder="Password" required/>
                    <button type="submit">Login</button>
                    <br></br><br></br>
                    <p id="dont-have-acc">Don't have an account ?</p>
                    <NavLink to="/Signup"><p id="btn-signup">Sign Up</p></NavLink>
                    <NavLink to="/"><p id="btn-home">&laquo;Home Page</p></NavLink>
                </form>
            </div>
        </div>
    )
}