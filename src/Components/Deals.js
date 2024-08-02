import "../css/Deals.css"
import img1 from "../assets/images/Clothes/1.jpeg"
import img2 from "../assets/images/Shoes/55.jpeg"
import img3 from "../assets/images/Clothes/3.jpeg"
import img4 from "../assets/images/Electronics/26.jpeg"
import img5 from "../assets/images/Clothes/10.jpeg"
import { useEffect, useState } from "react"
import axios from "axios";
import { NavLink } from "react-router-dom"
import {jwtDecode} from "jwt-decode";
import left_arrow from "../assets/icons/left-arrow.png"
import right_arrow from "../assets/icons/right-arrow.png"

export function Deals(){

    const [ deals, setDeals ] = useState([]);
    const [ wishlist, setWishlist ] = useState([]);
    const [ cartedProducts, setCartedProducts ] = useState([]);
    const [ pageNo, setPageNo ] = useState(0);
    const [ val, setVal ] = useState("null");

    useEffect(()=>{
        getAllDealsProducts();
        getWishlistProduct();
        getCartedProductList();
    },[pageNo, val]);

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

    async function getAllDealsProducts(){
        try{
            const resp = await axios.get(`https://fullstack-ecomm-backend-app.onrender.com/getAllDealsProducts?pageNo=${pageNo}&&filter=${val}`);
            // console.log("temp is",resp);
            setDeals(resp.data.data);
        }catch(error){
            console.log(error);
        }
    }

    async function getCartedProductList(){
        const custid = tokenCheck();
        if(custid != "null"){
            const cart = await axios.get(`https://fullstack-ecomm-backend-app.onrender.com/getCartedProductList?custId=${custid}`);
            setCartedProducts(cart.data.data.map(item => item.productId));
            // console.log(cart);
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
                getAllDealsProducts();
                getCartedProductList();
                getWishlistProduct();
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            alert("Please Login !");
        }
    }

    async function removeFormCart(proid){
        const custid = tokenCheck();
        const cart = await axios.delete(`https://fullstack-ecomm-backend-app.onrender.com/removeFromCart?custId=${custid}&&productId=${proid}`);
        
        getAllDealsProducts();
        getCartedProductList();
        getWishlistProduct();
    }

    async function getWishlistProduct(){
        const custid = tokenCheck();
        if(custid != "null"){
            const wishlist = await axios.get(`https://fullstack-ecomm-backend-app.onrender.com/getWishlistProduct?custId=${custid}`);
            setWishlist(wishlist.data.data.map(item => item.productId));
        }
    }

    async function addToWishlist(proid){
        const custid = tokenCheck();
        if(custid != "null"){
            const cart = await axios.post("https://fullstack-ecomm-backend-app.onrender.com/addToWishlist",{
                custId : custid,
                productId : proid
            });
            getAllDealsProducts();
            getWishlistProduct();
        }
        else{
            alert("Please Login !");
        }
    }

    async function removeFromWishlist(proid){
        const custid = tokenCheck();
        if(custid != "null"){
            const resp = await axios.delete(`https://fullstack-ecomm-backend-app.onrender.com/removeFromWishlist?custId=${custid}&&productId=${proid}`);

            getAllDealsProducts();
            getWishlistProduct();
            
        }
    }

    function formatImageUrl(url){
        return url.replace('/opt/render/project/src', '');
    }

    return(
        <div>
            <div id="top-brands-cont">
                <div id="top-brands-header">
                    <p>Top Discounts of the Week</p>
                    <select id="categories" onChange={(e)=>{ setVal(e.target.value) }}>
                        <option value="null">Filter</option>
                        <option value="lh">Low-High</option>
                        <option value="hl">High-Low</option>
                        {/* <option value="40">40% Off</option>
                        <option value="50">50% Off</option> */}
                    </select>
                </div>
                <div id="top-brands-products">
                        {/* Product Cards */}
                        {
                            deals.length > 0 ?(
                                deals.map((item,id)=>{
                                    const isInWishlist = wishlist.includes(item._id);
                                    const isInCart = cartedProducts.includes(item._id);
                                    const rel_path = item.product_image.split("/");
                                    const len = item.product_image.split("/").length;
                                    console.log("path is",rel_path[len-1]);
                                    console.log("Trial an error",item.product_image);
                                    
                                    return(
                                        <div id="home-product-card" key={id}>
                                            <div id="part-1">
                                                {/* {console.log("val is :",item.product_image)} */}
                                            <NavLink to={`/ProductDetails/${item._id}`}><img src={`https://fullstack-ecomm-backend-app.onrender.com${formatImageUrl(item.product_image)}`} id="pro-img" alt="Image" /></NavLink>
                                            {
                                                isInWishlist?(
                                                    <div className="filled-heart-icon" onClick={()=>removeFromWishlist(item._id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                                        </svg>
                                                    </div>
                                                ):(
                                                    <div className="heart-icon" onClick={()=>addToWishlist(item._id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                                        </svg>
                                                    </div>
                                                )
                                            }
                                            </div>
                                            <div id="part-2">
                                                <label className="pro-title">{item.product_name}</label>
                                                <div id="ratings-cont">
                                                    <p id="ratings">Ratings : {item.ratings}/5</p>&nbsp;
                                                    <div className="text-amber-500">
                                                        <svg class="w-4 h-4" viewBox="0 0 18 17" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                                                                fill="currentColor"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div id="price-offer">
                                                    <p className="price">₹.{item.price}<span> ({item.offer}% Off)</span></p>
                                                    {
                                                        isInCart ?(
                                                            <button onClick={()=>removeFormCart(item._id)}
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
                                                            <button onClick={()=>addToCart(item._id)}
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
                                <p>No products available !</p>
                            )
                        }
                </div>
                <div id="btn-pagination">
                    <img src={left_arrow} id="left-arr" onClick={()=>{ 
                        if(pageNo > 0){
                            setPageNo(pageNo - 1);
                        }
                        else{
                            setPageNo(0);
                        }
                        }}/>
                    <img src={right_arrow} id="right-arr" onClick={()=>{ setPageNo(pageNo + 1) }}/>
                </div>
            </div>        
        </div>
    )
}