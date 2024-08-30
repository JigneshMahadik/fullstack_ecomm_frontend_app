import { Footer } from "../Components/Footer";
import { Navbar } from "../Components/Navbar";
import img1 from "../assets/images/Clothes/5.jpeg"
// import img2 from "../assets/images/Clothes/4.jpeg"
import "../css/CartPage.css"
// import plus from "../assets/icons/plus.svg"
// import minus from "../assets/icons/minus.png"
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { loadRazorpayScript } from "../utils/razorpay";
// import Razorpay from  "razorpay";

export function CartPage(){

    const [ cartedProducts, setCartedProducts ] = useState([]);
    const [ total, setTotal ] = useState();

    useEffect(()=>{
        getCartedProductListWithDetails();
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

    async function getCartedProductListWithDetails(){
        const custid = tokenCheck();
        const cart = await axios.post(`https://fullstack-ecomm-backend-app.onrender.com/getCartedProductListWithDetails?custId=${custid}`);
        // setCartedProducts(cart.data.data.map(item => item.productId));
        console.log("quantity",cart.data.data)
        setCartedProducts(cart.data.data);
        const totalPrice = cart.data.data.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);
        setTotal(totalPrice);
    }

    async function increase(proid){
        const custid = tokenCheck();
        // console.log(proid)
        if(custid != "null"){
            const cart = await axios.put(`https://fullstack-ecomm-backend-app.onrender.com/increaseQuantity?custId=${custid}&&productId=${proid}`);
            getCartedProductListWithDetails();
        }
    }
    async function decrease(proid){
        const custid = tokenCheck();
        // console.log(proid)
        if(custid !== "null"){
            await axios.put(`https://fullstack-ecomm-backend-app.onrender.com/decreaseQuantity?custId=${custid}&&productId=${proid}`);
            getCartedProductListWithDetails();
        }
    }

    async function removeFromCart(proid){
        const custid = tokenCheck();
        if(custid !== "null"){
            const removedProduct = await axios.delete(`https://fullstack-ecomm-backend-app.onrender.com/removeFromCart?custId=${custid}&&productId=${proid}`);
            // console.log("jack",proid);
            // setIsInCart(false);
            getCartedProductListWithDetails();
        }
    }
    
    // Checkout to Payment
    async function checkout(total){
        const custid = tokenCheck();
        
        if(custid !== "null"){
            // const newOrder = await axios.post(`http://localhost:8082/placeOrder?custid=${custid}`);
            // console.log("New Order",newOrder);
            // setIsInCart(false);
            getCartedProductListWithDetails();

            const res = await loadRazorpayScript();
            if (!res) {
                alert('Razorpay SDK failed to load. Are you online?');
                return;
            }

            try
            {
                const resp = await axios.post(`https://fullstack-ecomm-backend-app.onrender.com/placeOrder?custid=${custid}&&total=${total}`,{
                    product: cartedProducts.map(item => ({
                        productId: item.productId._id,
                        quantity: item.quantity
                    })),
                });
                // console.log("jack is",resp)
                const options = {
                    key: 'rzp_test_jrCov5EqE0IEXh',
                    amount: total*100,
                    currency: "INR",
                    name: 'Your Company Name',
                    description: 'Test Transaction',
                    order_id: resp.data.newOrder.id,
                    handler: async (response) => {
                        try{
                            const result = await axios.post(`https://fullstack-ecomm-backend-app.onrender.com/verify-payment?custid=${custid}&&total=${total}`, {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            });
                            // console.log("ResULT is:",result.data);
                            alert('Payment successful');
                            getCartedProductListWithDetails();
                        }
                        catch (error){
                            alert('Payment verification failed');
                        }
                    },
                    prefill: {
                        name: 'Your Name',
                        email: 'jigneshmahadik2898@gmail.com',
                        contact: '9999999999'
                    },
                    notes: {
                        address: 'Your Address'
                    },
                    theme: {
                        color: '#3399cc'
                    }
                };
        
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            }
            catch(error){
                console.log("Payment failed",error);
            }
        }
    }

    return(
        <div>
            <Navbar/>
            <section className="py-24 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                    
                        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Shopping Cart
                        </h2>
                        {
                            cartedProducts.length > 0 ? (
                                cartedProducts.map((item,id)=>{
                                    return(
                                        <div key={id} className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">
                                            <div className="col-span-12 lg:col-span-2 img box">
                                                <img src={item.productId.product_image} alt="speaker image" className="max-lg:w-full lg:w-[180px] "/>
                                            </div>
                                            <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                                                <div className="flex items-center justify-between w-full mb-4">
                                                <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">{item.productId.product_name}</h5>
                                                    <button className="rounded-full group flex items-center justify-center focus-within:outline-red-500"
                                                    onClick={()=>{ removeFromCart(item.productId._id) }}>
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
                                                        {/* Decrease functionality */}
                                                        <button onClick={()=>{ decrease(item.productId._id) }}
                                                            disabled={item.quantity <= 1}
                                                            className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                                                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                                width="18" height="19" viewBox="0 0 18 19" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M4.5 9.5H13.5" stroke="" strokeWidth="1.6" strokeLinecap="round"
                                                                    strokeLinejoin="round" />
                                                            </svg>
                                                        </button>
                                                        <input type="text" id="number"
                                                            className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100  text-center"
                                                            placeholder={item.quantity} disabled/>
                                                            {/* Increase functionality */}
                                                            <button onClick={()=>{ increase(item.productId._id) }}
                                                                className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                                                                <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                                    width="18" height="19" viewBox="0 0 18 19" fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M3.75 9.5H14.25M9 14.75V4.25" stroke="" strokeWidth="1.6"
                                                                        strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </button>
                                                    </div>
                                                    {/* Total */}
                                                    <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">₹{item.productId.price * item.quantity}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ):(
                                <p>Cart is Empty</p>
                            )
                        }

                        {
                            cartedProducts && cartedProducts.length > 0 ? (
                                <div>
                                    <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
                                        <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">Subtotal</h5>

                                        <div className="flex items-center justify-between gap-5 ">
                                            {/* <button
                                                className="rounded-full py-2.5 px-3 bg-indigo-50 text-indigo-600 font-semibold text-xs text-center whitespace-nowrap transition-all duration-500 hover:bg-indigo-100">Promo
                                                Code?</button> */}
                                            <h6 className="font-manrope font-bold text-3xl lead-10 text-indigo-600">₹{total}</h6>
                                        </div>
                                    </div>
                                    <div className="max-lg:max-w-lg max-lg:mx-auto">
                                        {/* <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">Shipping taxes, and discounts
                                            calculated
                                            at checkout</p> */}
                                        <button onClick={()=>{checkout(total)}}
                                            className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 ">Checkout to Payment</button>
                                    </div>
                                </div>
                            ):(
                                <p></p>
                            )
                        }
                </div>
            </section>                      
            <Footer/>
        </div>
    )
}
