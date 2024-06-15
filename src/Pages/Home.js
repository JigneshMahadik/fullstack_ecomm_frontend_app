import { Footer } from "../Components/Footer";
import { HomeBanner } from "../Components/HomeBanner";
import { Navbar } from "../Components/Navbar";
import { Sale } from "../Components/Sale";
import { TopBrands } from "../Components/TopBrands";


export function Home(){
    return(
        <div>
            <Navbar/>
            <HomeBanner/>
            <TopBrands/>
            <Sale/>
            <Footer/>
        </div>
    )
};