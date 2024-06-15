import { Footer } from "../Components/Footer.js"
import { Navbar } from "../Components/Navbar.js"
import { ProductDetails } from "../Components/ProductDetails.js"


export function ProductDetailsPage(){
    return(
        <div>
            <Navbar/>
            <ProductDetails/>
            <Footer/>
        </div>
    )
}