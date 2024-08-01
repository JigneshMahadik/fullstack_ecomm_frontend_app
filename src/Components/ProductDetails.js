import "../css/ProductDetails.css"
import img5 from "../assets/images/Clothes/2.jpeg"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";


export function ProductDetails(){

    const [ productDetails, setProductDetails ] = useState();
    const [ productImage, setProductImage ] = useState();
    const { proid } = useParams();
    const [ isInCart, setIsInCart ] = useState();
    const [ isInWishlist, setIsInWishlist ] = useState(false);

    useEffect(()=>{
        getProductDetails();
        getCartDetails();
        getWishlistDetails();
    },[]);

    async function getProductDetails(){
        const pro_det = await axios.get(`https://fullstack-ecomm-backend-app.onrender.com/productDetails?proid=${proid}`);
        setProductDetails(pro_det.data.data);
        // console.log(pro_det.data.data);
        var imgPath = pro_det.data.data.product_image.replace("C:\\fakepath\\", "C:/Geekster_Assignment/NodeJS/Projects_for_Resume/E-commerce-app/frontend/src/assets/images/Clothes/");
        setProductImage(imgPath);
    }

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

    async function getCartDetails(){
        const custid = tokenCheck();
        // console.log("cust is",custid);
        if(custid != "null"){
            // console.log("jack",custid);
            const isCarted = await axios.post("https://fullstack-ecomm-backend-app.onrender.com/getCartDetails",{
                custId : custid,
                productId : proid    
            });
            if(isCarted){
                // console.log("not carted",isCarted.data.isProductInCart);
                setIsInCart(isCarted.data.isProductInCart);
            }
        }
    }

    async function addToCart(proid){
        const custid = tokenCheck();
        
        if(custid != "null"){
            const cart = await axios.post("https://fullstack-ecomm-backend-app.onrender.com/addToCart",{
                custId : custid,
                productId : proid
            });
            setIsInCart(true);
        }
        else{
            alert("Please Login !");
        }
    }

    async function removeFromCart(proid){
        const custid = tokenCheck();
        if(custid !== "null"){
            const removedProduct = await axios.delete(`https://fullstack-ecomm-backend-app.onrender.com/removeFromCart?custId=${custid}&&productId=${proid}`);
            // console.log(removedProduct);
            setIsInCart(false);
        }
    }
    
    async function getWishlistDetails(){
        const custid = tokenCheck();

        if(custid != "null"){
            const wishlist = await axios.post("https://fullstack-ecomm-backend-app.onrender.com/getWishlistDetails",{
                custId : custid,
                productId : proid    
            });
            // console.log("fetching : ",wishlist.data.isProductInWishlist)
            if(wishlist){
                setIsInWishlist(wishlist.data.isProductInWishlist);
            }
        }
    }

    async function addToWishlist(proid){
        const custid = tokenCheck();

        if(custid != "null"){
            const wishlist = await axios.post("https://fullstack-ecomm-backend-app.onrender.com/addToWishlist",{
                custId : custid,
                productId : proid
            });
            console.log("adding",wishlist)
            setIsInWishlist(true);
        }
        else{
            alert("Please Login !");
        }
    }
    
    async function removeFromWishlist(proid){
        const custid = tokenCheck();
        if(custid != "null"){
            const resp = await axios.delete(`https://fullstack-ecomm-backend-app.onrender.com/removeFromWishlist?custId=${custid}&&productId=${proid}`);
            // console.log(custid,productid)
            // console.log("removed",resp);
            setIsInWishlist(false);
        }
    }

    


    return(
        <div>
            {
                productDetails ? (
                    <div id="pro-det-main-container">
                        <div id="product-row-1">
                            
                            {/* Left container */}
                            <div id="pro-image">
                                <img src={productImage}/>
                            </div>
                            {/* Right Container */}
                            <div id="pro-details">
                                {/* <h1>Elista Jewel</h1> */}
                                <div id="title-cont">
                                    <p id="pro-title"> {productDetails.product_name} </p>
                                    <div id="pro-det-ratings-cont">
                                        <p id="pro-det-ratings">Ratings : {productDetails.ratings}/5</p>&nbsp;
                                        <div className="text-amber-500">
                                            <svg class="w-4 h-4" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z" fill="currentColor">                                                
                                                </path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div id="price-cont">
                                    {/* <p id="price">Price : </p>&nbsp; */}
                                    <p>Rs.{productDetails.price} ({productDetails.offer}% Off)</p>
                                </div>
                                <br></br>
                                <div id="size-cont">
                                    {/* <p id="price">Price</p> */}
                                    {/* <p>Sizes : </p> */}
                                    {/* <div id="sizes">
                                        <div>S</div>
                                        <div>M</div>
                                        <div>L</div>
                                    </div> */}
                                    <p>Material Type : </p>
                                    <p id="material">{productDetails.product_type}</p>
                                </div>
                                <div id="details">
                                    <h1>Product Details : </h1>
                                    <p> 
                                        {productDetails.product_detail}
                                    </p>
                                    <p>
                                        (Note: Ensure to check the latest product details, pricing, and reviews on the official product page as they may change over time.)
                                    </p>
                                </div>
                                
                                        {/* <div id="btns-remove">
                                        {
                                            isInCart ? (
                                                    <button id="btn-remove-1" onClick={()=>removeFromCart(productDetails._id)}>Remove From Cart</button>
                                            ):(
                                                <button id="btn-add-1" onClick={()=>addToCart(productDetails._id)}>Add to Cart</button>
                                            )
                                        }
                                        </div>
                                        
                                        <div id="btns-add">
                                            {
                                                isInWishlist?(
                                                    <button id="btn-add-2" onClick={()=> addToWishlist(productDetails._id) }>Remove from Wishlist</button>
                                                ):(
                                                    <button id="btn-add-2" onClick={()=> addToWishlist(productDetails._id) }>Add to Wishlist</button>
                                                )
                                            }
                                        </div> */}
                                <div id="pro-det-btn-cont">
                                    <div id="btn-1">
                                    {
                                        isInCart ?(
                                            <button id="btn-remove-1" onClick={()=>removeFromCart(productDetails._id)}>Remove From Cart</button>
                                        ):(
                                            <button id="btn-add-1" onClick={()=>addToCart(productDetails._id)}>Add to Cart</button>
                                        )
                                    }
                                    </div>
                                    <div id="btn-2">
                                    {
                                        isInWishlist ?(
                                            <button id="btn-remove-1" onClick={()=> removeFromWishlist(productDetails._id) }>Remove from Wishlist</button>
                                        ):(
                                            <button id="btn-add-2" onClick={()=> addToWishlist(productDetails._id) }>Add to Wishlist</button>
                                        )
                                    }
                                    </div>
                                </div>
                                {/* <div id="btns-remove">
                                    {
                                        isInCart?(
                                            <button id="btn-remove-1" onClick={()=>removeFromCart(productDetails._id)}>Remove From Cart</button>
                                        ):(
                                            <button id="btn-add-1" onClick={()=>addToCart(productDetails._id)}>Add to Cart</button>
                                        )
                                    }
                                </div> */}
                            </div>

                        </div>

                        {/* use below code in case of product details for above code become so long */}
                        
                        {/* <div id="pro-des">
                            <h1>Product Description</h1>
                            <p> Line 10:25:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  
                            Line 10:25:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative image
                            </p>
                        </div> */}
                    </div>
                ):(
                    <p>Product Details not available !</p>
                )
            }
        </div>
    )
}