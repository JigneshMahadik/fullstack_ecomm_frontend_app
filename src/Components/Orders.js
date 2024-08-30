import { useEffect, useState } from "react"
import axios from "axios";
import {jwtDecode} from "jwt-decode";


export function Orders(){

    const [ orders, setOrders ] = useState([]);
    const [ productDetails, setProductDetails ] = useState({});

    useEffect(()=>{
        fetchedOrders();
    },[]);

    // Start Token Check
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
    // End Token Check

    async function fetchedOrders(){
        const custid = tokenCheck();
        if(custid !== "null"){
            const resp = await axios.get(`http://localhost:8082/orders?custid=${custid}`);
            // console.log("Orders are : ",resp.data.response);
            setOrders(resp.data.response);
        }
    }

    async function fetchProductDetails(proid){
        if (!productDetails[proid]) {
          const resp = await axios.get(`http://localhost:8082/productDetails?proid=${proid}`);
        //   console.log("Product details:", resp.data.data);
          setProductDetails((prevDetails) => ({
            ...prevDetails,
            [proid]: resp.data.data,
          }));
        }
    }

    return(
        <div>
            {/* {
                orders?(
                    orders.map((item,id)=>{
                        return(
                            <div>{console.log("item is",item)}</div>
                        )
                    })
                ):(
                    <p>No orders available !</p>
                )
            } */}
            <section class="py-24 relative">
                <div class="w-full max-w-7xl mx-auto px-4 md:px-8">
                    <h2 class="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">Order History</h2>

                    {/* <div class="flex sm:flex-col lg:flex-row sm:items-center justify-between">
                        <ul class="flex max-sm:flex-col sm:items-center gap-x-14 gap-y-3">
                            <li
                                class="font-medium text-lg leading-8 cursor-pointer text-indigo-600 transition-all duration-500 hover:text-indigo-600">
                                All Order</li>
                            <li
                                class="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
                                Summary</li>
                            <li
                                class="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
                                Completed</li>
                            <li
                                class="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
                                Cancelled</li>
                        </ul>
                        <div class="flex max-sm:flex-col items-center justify-end gap-2 max-lg:mt-5">
                            <div class="flex rounded-full py-3 px-4 border border-gray-300 relative">
                                <svg class="relative " width="18" height="20" viewBox="0 0 18 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.5 7.75H16.5M11.9213 11.875H11.928M11.9212 14.125H11.9279M9.14676 11.875H9.1535M9.14676 14.125H9.1535M6.37088 11.875H6.37762M6.37088 14.125H6.37762M5.25 4.75V1.75M12.75 4.75V1.75M7.5 18.25H10.5C13.3284 18.25 14.7426 18.25 15.6213 17.3713C16.5 16.4926 16.5 15.0784 16.5 12.25V9.25C16.5 6.42157 16.5 5.00736 15.6213 4.12868C14.7426 3.25 13.3284 3.25 10.5 3.25H7.5C4.67157 3.25 3.25736 3.25 2.37868 4.12868C1.5 5.00736 1.5 6.42157 1.5 9.25V12.25C1.5 15.0784 1.5 16.4926 2.37868 17.3713C3.25736 18.25 4.67157 18.25 7.5 18.25Z"
                                        stroke="#111827" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <input type="text" name="from-dt" id="from-dt"
                                    class="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900" placeholder="11-01-2023"/>
                            </div>
                            <p class="font-medium text-lg leading-8 text-black">To</p>
                            <div class="flex rounded-full py-3 px-4 border border-gray-300 relative">
                                <svg class="relative " width="18" height="20" viewBox="0 0 18 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.5 7.75H16.5M11.9213 11.875H11.928M11.9212 14.125H11.9279M9.14676 11.875H9.1535M9.14676 14.125H9.1535M6.37088 11.875H6.37762M6.37088 14.125H6.37762M5.25 4.75V1.75M12.75 4.75V1.75M7.5 18.25H10.5C13.3284 18.25 14.7426 18.25 15.6213 17.3713C16.5 16.4926 16.5 15.0784 16.5 12.25V9.25C16.5 6.42157 16.5 5.00736 15.6213 4.12868C14.7426 3.25 13.3284 3.25 10.5 3.25H7.5C4.67157 3.25 3.25736 3.25 2.37868 4.12868C1.5 5.00736 1.5 6.42157 1.5 9.25V12.25C1.5 15.0784 1.5 16.4926 2.37868 17.3713C3.25736 18.25 4.67157 18.25 7.5 18.25Z"
                                        stroke="#111827" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <input type="text" name="to-dt" id="to-dt"
                                    class="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900" placeholder="11-01-2023"/>
                            </div>
                        </div>
                    </div> */}
                    {
                        orders?(
                            orders.map((order,id)=>{
                                // console.log("quan is",id,order);
                                const date = new Date(order.createdAt);
                                const day = date.getDate();
                                // console.log("day is",day)
                                const month = date.toLocaleString('default', { month: 'long' });
                                const year = date.getFullYear();
                                return(
                                    <div key={id}>
                                        <div class="mt-7 border border-gray-300 pt-9">
                                            <div class="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                                                <div class="data">
                                                    <p class="font-medium text-lg leading-8 text-black whitespace-nowrap">Order : #{order.razorpay_order_id}</p>
                                                    {/* <p class="text-left font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">Order Payment : {day}_
                                                        {month} {year}</p> */}
                                                </div>
                                                {/* <div class="flex items-center gap-3 max-md:mt-5">
                                                    <button
                                                        class="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">Show
                                                        Invoice</button>
                                                    <button
                                                        class="rounded-full px-7 py-3 bg-indigo-600 shadow-sm shadow-transparent text-white font-semibold text-sm transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700">Buy
                                                        Now</button>

                                                </div> */}
                                                <p class="text-left font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">Date : {day}_
                                                {month} {year}</p>
                                            </div>
                                            <svg class="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2"
                                                fill="none">
                                                <path d="M0 1H1216" stroke="#D1D5DB" />
                                            </svg>
                                            {
                                                order.products.map((item, idx) => {
                                                    // const order_resp = fetch(`http://localhost:8082/productDetails?proid=${item.productId}`)
                                                    // console.log("pro id is",order_resp);
                                                    // fetchProductDetails(item.productId);
                                                    fetchProductDetails(item.productId);
                                                    const product = productDetails[item.productId];
                                                    // console.log("pro id is",product);
                                                    // const rel_path = item.product_image.split("/");
                                                    // const len = item.product_image.split("/").length;
                                                    // console.log("jack",item);
                                                    // Check if product data is available
                                                    if (!product) {
                                                        // If product data is not available, render a loading state or a placeholder
                                                        return (
                                                            <div key={idx}>
                                                                <p>Loading...</p>
                                                            </div>
                                                        );
                                                    }

                                                    return(
                                                        <div key={idx}>
                                                            <div class="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                                                                <div class="grid grid-cols-4 w-full">
                                                                    <div class="col-span-4 sm:col-span-1">
                                                                        {/* <img src={`https://fullstack-ecomm-backend-app.onrender.com/filesUploaded/${rel_path[len-1]}`} alt="" class="max-sm:mx-auto"/> */}
                                                                        <img src={product.product_image} alt="" class="max-sm:mx-auto"/>
                                                                    </div>
                                                                    <div
                                                                        class="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                                                                        <h6 class="text-left font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">
                                                                        {product ? product.product_name : "Loading..."}</h6>
                                                                        <p class="font-normal text-lg leading-8 text-gray-500 mb-8 whitespace-nowrap text-left">Type : {product ? product.product_type:"Loading..."}</p>
                                                                        <div class="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                                                                            {/* <span class="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Size:
                                                                                s</span> */}
                                                                            <span class="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Qty:{item.quantity}
                                                                                </span>
                                                                            <p class="font-semibold text-xl leading-8 text-black whitespace-nowrap">₹ {product ? product.price: "Loading..."}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
                                                                    <div class="flex flex-col justify-center items-start max-sm:items-center">
                                                                        <p class="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                                                                            Payment</p>
                                                                            {
                                                                                order.status==="paid" ?(
                                                                                    <p class="font-semibold text-lg leading-8 text-green-500 text-left whitespace-nowrap">
                                                                                        {order.status}
                                                                                    </p>
                                                                                ):(
                                                                                    <p class="font-semibold text-lg leading-8 text-red-500 text-left whitespace-nowrap">
                                                                                        Pending
                                                                                    </p>
                                                                                )
                                                                            }
                                                                    </div>
                                                                    <div class="flex flex-col justify-center items-start max-sm:items-center">
                                                                        <p class="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                                                                            Amount</p>
                                                                        <p class="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
                                                                            {product ? product.price * item.quantity: "Loading..."}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <svg class="mt-9 mb-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2"
                                                                fill="none">
                                                                <path d="M0 1H1216" stroke="#D1D5DB" />
                                                            </svg>
                                                        </div>
                                                    )
                                                })
                                            }

                                            <div class="px-3 md:px-11 text-right max-sm:flex-col-reverse">
                                                {/* <div class="flex max-sm:flex-col-reverse items-center">
                                                    <button
                                                        class="flex items-center gap-3 py-10 pr-8 sm:border-r border-gray-300 font-normal text-xl leading-8 text-gray-500 group transition-all duration-500 hover:text-indigo-600">
                                                        <svg width="40" height="41" viewBox="0 0 40 41" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path class="stroke-gray-600 transition-all duration-500 group-hover:stroke-indigo-600"
                                                                d="M14.0261 14.7259L25.5755 26.2753M14.0261 26.2753L25.5755 14.7259" stroke=""
                                                                stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                        cancel order
                                                    </button>
                                                    <p class="font-normal text-xl leading-8 text-gray-500 sm:pl-8">Payment Is Succesfull</p>
                                                </div> */}
                                                <p class="font-medium text-xl leading-8 text-black max-sm:py-4"> <span class="text-gray-500">Total
                                                        Price: </span> &nbsp;₹{order.amount_paid}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ):(
                            <p>No Orders Available !</p>
                        )
                    }
                </div>
            </section>                      
        </div>
    )
}