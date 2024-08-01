import { Footer } from "../Components/Footer";
import { Navbar } from "../Components/Navbar";
import img1 from "../assets/images/Clothes/5.jpeg"
import img2 from "../assets/images/Clothes/4.jpeg"
import "../css/CartPage.css"
// import plus from "../assets/icons/plus.svg"
// import minus from "../assets/icons/minus.png"
import "../css/WishlistPage.css"
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";


export function Wishlist(){

    const [ wishlistProducts, setWishlistProducts ] = useState([]);
    const [ cartedProducts, setCartedProducts ] = useState([]);

    useEffect(()=>{
        getWishlistProductListWithDetails();
        getCartedProductList();
    },[]);

    function tokenCheck(){
        const token = sessionStorage.getItem('token'); // or wherever you store your token
        if(!token){
            return "null";
        }
        else{
            const decodedToken = jwtDecode(token);
            const custid = decodedToken.customer_id;
            return custid;
        }
    }

    async function getWishlistProductListWithDetails(){
        const custid = tokenCheck();
        const cart = await axios.post(`https://fullstack-ecomm-backend-app.onrender.com/getWishlistProductListWithDetails?custId=${custid}`);
        // setCartedProducts(cart.data.data.map(item => item.productId));
        console.log("quantity",cart.data.data)
        setWishlistProducts(cart.data.data);
        // const totalPrice = cart.data.data.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);
        // setTotal(totalPrice);
    }

    async function removeFromWishlist(proid){
        // console.log("jack",proid);
        const custid = tokenCheck();
        if(custid !== "null"){
            const removedProduct = await axios.delete(`https://fullstack-ecomm-backend-app.onrender.com/removeFromWishlist?custId=${custid}&&productId=${proid}`);
            // console.log("jack",proid);
            // setIsInCart(false);
            getWishlistProductListWithDetails();
        }
    }

    async function getCartedProductList(){
        const custid = tokenCheck();
        if(custid != "null"){
            const cart = await axios.get(`https://fullstack-ecomm-backend-app.onrender.com/getCartedProductList?custId=${custid}`);
            setCartedProducts(cart.data.data.map(item => item.productId));
            console.log(cart);
        }
    }

    async function addToCart(proid){
        const custid = tokenCheck();
        if(custid != "null"){
            try{
                const cart = await axios.post("https://fullstack-ecomm-backend-app.onrender.com/addToCart",{
                    custId : custid,
                    productId : proid
                });
                getCartedProductList();
                getWishlistProductListWithDetails();
            }
            catch(error){
                console.log(error);
            }
        }
    }

    async function removeFromCart(proid){
        const custid = tokenCheck();
        const cart = await axios.delete(`https://fullstack-ecomm-backend-app.onrender.com/removeFromCart?custId=${custid}&&productId=${proid}`);

        getCartedProductList();
    }


    return(
        <div>
            <Navbar/>
            <section className="py-24 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                    <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Wishlist
                    </h2>
                    {
                        wishlistProducts.length > 0 ? (
                            wishlistProducts.map((item,id)=>{
                                if (!item.productId) {
                                    return null; // skip items with null or undefined productId
                                }
                                const isInCart = cartedProducts.includes(item.productId._id);
                                // console.log("karun",isInCart);
                                return(
                                    <div key={id} className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">
                                        <div className="col-span-12 lg:col-span-2 img box">
                                            <img src={img1} alt="speaker image" className="max-lg:w-full lg:w-[180px] "/>
                                        </div>
                                        <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                                            <div className="flex items-center justify-between w-full mb-4">
                                                <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">{item.productId.product_name}</h5>
                                                <button onClick={()=>removeFromWishlist(item.productId._id)}
                                                className="rounded-full group flex items-center justify-center focus-within:outline-red-500">
                                                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <circle className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                                                            cx="17" cy="17" r="17" fill="" />
                                                            <path className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                                                                d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                                                                stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="font-normal text-base leading-7 text-gray-500 mb-6 text-left">
                                            {item.productId.product_detail}
                                                {/* <p>Ratings : 4.5/5</p> */}
                                                <div className="flex mt-3 b">
                                                    <span className="text-black font-semibold">Offer :</span>&nbsp;
                                                    <span>{item.productId.offer}% Off</span>
                                                </div>
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-4">
                                                    <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">₹{item.productId.price}</h6>
                                                </div>
                                                {
                                                    isInCart ?(
                                                        <button onClick={()=>removeFromCart(item.productId._id)}
                                                            className="p-1 min-[400px]:p-2 rounded-full bg-blue-600 border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-blue-600">
                                                            <svg className="stroke-white transition-all duration-500"
                                                                xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                                                                fill="none">
                                                                <path
                                                                    d="M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25"
                                                                    stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                                            </svg>
                                                        </button>
                                                    ):(
                                                        <button onClick={()=>{ addToCart(item.productId._id) }}
                                                            className="p-1 min-[400px]:p-2 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-blue-600">
                                                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-white"
                                                                xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                                                                fill="none">
                                                                <path
                                                                    d="M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25"
                                                                    stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                                            </svg>
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ):(
                            <p>Wishlist is Empty</p>
                        )
                    }
                </div>
            </section>                      
            <Footer/>
        </div>
    )
}