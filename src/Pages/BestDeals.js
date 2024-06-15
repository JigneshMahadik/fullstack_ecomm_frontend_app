import { BestDealsBanner } from "../Components/BestDealsBanner";
import { Deals } from "../Components/Deals";
import { Footer } from "../Components/Footer";
import { Navbar } from "../Components/Navbar";
import { Subscribe } from "../Components/Subscribe";

export function BestDeals(){
    return(
        <div>
            <Navbar/>
            <BestDealsBanner/>
            <Deals/>
            <Subscribe/>
            <Footer/>
        </div>
    )
}