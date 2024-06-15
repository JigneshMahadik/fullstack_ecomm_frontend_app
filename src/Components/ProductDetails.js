import "../css/ProductDetails.css"
import img5 from "../assets/images/Clothes/2.jpeg"

export function ProductDetails(){
    return(
        <div>
            <div id="pro-det-main-container">
                <div id="product-row-1">
                    
                    {/* Left container */}
                    <div id="pro-image">
                        <img src={img5}/>
                    </div>
                    {/* Right Container */}
                    <div id="pro-details">
                        {/* <h1>Elista Jewel</h1> */}
                        <div id="title-cont">
                            <p id="pro-title"> Amazon Brand - Symbol Men's Solid Cotton T Shirt | Plain | Round Neck | Half Sleeve - Regular Fit | Combo </p>
                            <p id="ratings">4.5/5 Rating</p>
                        </div>
                        <br></br>
                        <div id="price-cont">
                            {/* <p id="price">Price : </p>&nbsp; */}
                            <p>Rs.799</p>
                        </div>
                        <br></br>
                        <div id="size-cont">
                            {/* <p id="price">Price</p> */}
                            <p>Sizes : </p>
                            <div id="sizes">
                                <div>S</div>
                                <div>M</div>
                                <div>L</div>
                            </div>
                        </div>
                        <div id="details">
                            <h1>Product Details : </h1>
                            <p> 
                                Line 10:25:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  
                                Line 10:25:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative image
                            </p>
                            <p>
                                (Note: Ensure to check the latest product details, pricing, and reviews on the official product page as they may change over time.)
                            </p>
                        </div>
                        <div id="btns-add">
                            <button id="btn-add-1">Add to Cart</button>
                            <button id="btn-add-2">Add to Wishlist</button>
                        </div>
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
        </div>
    )
}