import "../css/Navbar.css";
import stackIcon from "../assets/icons/stack.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import cust from "../assets/icons/cust3.png";
import {jwtDecode} from "jwt-decode";

export function Navbar() {
    const [token, setToken] = useState();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [ userName, setUserName ] = useState();
    const [ isProfilePopup, setIsProfilePopup ] = useState(false);
    

    useEffect(() => {
        const token = sessionStorage.getItem('token'); // or wherever you store your token
        if (token && typeof token === "string") {
            const decodedToken = jwtDecode(token);
            const username = decodedToken.name;
            setUserName(username);
        }

        if (token != null) {
            setToken(token);
        }
    }, []);

    function togglePopup(isProfile) {
        setIsPopupVisible(!isPopupVisible);
        setIsProfilePopup(isProfile);
    }

    function logout(){
        const token = sessionStorage.removeItem('token'); // or wherever you store your token
        window.location.reload();
        window.location.href = "/";
    }

    return (
        <div>
            <nav>
                <div id="logo">
                    <h1>CartFlex</h1>
                </div>
                <div id="menu">
                    <NavLink to="/"><p>Home</p></NavLink>
                    <NavLink to="/Best-Deals"><p>Best Deals</p></NavLink>
                    <NavLink to="/Collection"><p>Collection</p></NavLink>
                    {
                        token ?(
                            <NavLink to="/Orders"><p>Orders</p></NavLink>
                        ):(
                            <p id="hide-orders"></p>
                        )
                    }
                </div>
                {token ? (
                    <div id="profile" onClick={ ()=> togglePopup(true)}>
                        <img src={cust} alt="Profile" />
                    </div>
                ) : (
                    <div id="auth-btn">
                        <NavLink to="/Login"><button>Login</button></NavLink>
                        <NavLink to="/Signup"><button>Signup</button></NavLink>
                    </div>
                )}
                <div id="stack-cont" onClick={ ()=> togglePopup(false)}>
                    <img src={stackIcon} alt="Stack" />
                </div>
            </nav>

            <div id="popup" className={isPopupVisible ? '' : 'hidden'}>
                <div className="popup-content">
                    <button className="close-btn" onClick={togglePopup}>X</button>
                    <ul>
                        {
                            isProfilePopup ?(
                                <div>
                                    <NavLink to="/Wishlist"><li>Wishlist</li></NavLink>
                                    <NavLink to="/CartPage"><li>Cart</li></NavLink>
                                    <NavLink onClick={ logout }><li id="logout">Logout</li></NavLink>
                                </div>
                            ):(
                                token ?(
                                    <div>
                                        <NavLink to="/"><li>Home</li></NavLink>
                                        <NavLink to="/Best-Deals"><li>Best Deals</li></NavLink>
                                        <NavLink to="/Collection"><li>Collection</li></NavLink>
                                        <NavLink to="/Orders"><li>Orders</li></NavLink>
                                        <NavLink to="/Wishlist"><li>Wishlist</li></NavLink>
                                        <NavLink to="/CartPage"><li>Cart</li></NavLink>
                                        <NavLink onClick={ logout }><li id="logout">Logout</li></NavLink>
                                    </div>
                                ):(
                                    <div>
                                        <NavLink to="/"><li>Home</li></NavLink>
                                        <NavLink to="/Best-Deals"><li>Best Deals</li></NavLink>
                                        <NavLink to="/Collection"><li>Collection</li></NavLink>
                                    </div>
                                ) 
                            )
                        }
                    </ul>
                    {
                        token ?(
                            <p id="user-name">Welcome, {userName}</p>
                        ):(
                            <div id="auth-btn">
                                <NavLink to="/Login"><button>Login</button></NavLink>
                                <NavLink to="/Signup"><button>Signup</button></NavLink>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
