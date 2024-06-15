import "../css/Mens.css"
import img1 from "../assets/images/Clothes/1.jpeg"
import img2 from "../assets/images/Shoes/55.jpeg"
import img3 from "../assets/images/Clothes/3.jpeg"
import img4 from "../assets/images/Electronics/26.jpeg"
import img5 from "../assets/images/Clothes/10.jpeg"


export function Mens(){
    return(
        <div>
            <div id="top-brands-cont">
                    <div id="top-brands-header">
                        <p>Men's Exclusives</p>
                        <select id="categories">
                            <option>Filter</option>
                            <option>Price(Low-High)</option>
                            <option>Price(High-Low)</option>
                            <option>Top Sellers</option>
                        </select>
                    </div>
                    <div id="top-brands-products">
                        {/* Product Cards */}
                        <div id="product-card">
                            <div id="part-1">
                                <img src={img1} id="pro-img"/>
                            </div>
                            <div id="part-2">
                                <p>Adidas black t-shirt for mens</p>
                                <div id="price-offer">
                                    <p>$.299</p>
                                    <p>60% Off</p>
                                </div>
                                <div id="addToCartBtn">Add to Cart</div>
                            </div>
                        </div>
                        <div id="product-card">
                            <div id="part-1">
                                <img src={img2} id="pro-img"/>
                            </div>
                            <div id="part-2">
                                <p>Adidas black t-shirt for mens</p>
                                <div id="price-offer">
                                    <p>$.299</p>
                                    <p>60% Off</p>
                                </div>
                                <div id="addToCartBtn">Add to Cart</div>
                            </div>
                        </div>
                        <div id="product-card">
                            <div id="part-1">
                                <img src={img3} id="pro-img"/>
                            </div>
                            <div id="part-2">
                                <p>Adidas black t-shirt for mens</p>
                                <div id="price-offer">
                                    <p>$.299</p>
                                    <p>60% Off</p>
                                </div>
                                <div id="addToCartBtn">Add to Cart</div>
                            </div>
                        </div>
                        <div id="product-card">
                            <div id="part-1">
                                <img src={img4} id="pro-img"/>
                            </div>
                            <div id="part-2">
                                <p>Adidas black t-shirt for mens</p>
                                <div id="price-offer">
                                    <p>$.299</p>
                                    <p>60% Off</p>
                                </div>
                                <div id="addToCartBtn">Add to Cart</div>
                            </div>
                        </div>
                        <div id="product-card">
                            <div id="part-1">
                                <img src={img5} id="pro-img"/>
                            </div>
                            <div id="part-2">
                                <p>Adidas black t-shirt for mens</p>
                                <div id="price-offer">
                                    <p>$.299</p>
                                    <p>60% Off</p>
                                </div>
                                <div id="addToCartBtn">Add to Cart</div>
                            </div>
                        </div>
                    </div>
            </div>        
        </div>
    )
}