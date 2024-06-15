import { CollectionBanner } from "../Components/CollectionBanner";
import { Footer } from "../Components/Footer";
import { Kids } from "../Components/Kids";
import { Mens } from "../Components/Mens";
import { Navbar } from "../Components/Navbar";
import { Womens } from "../Components/Womens";


export function Collection(){
    return(
        <div>
            <Navbar/>
            <CollectionBanner/>
            <Mens/>  
            <hr></hr>
            <Womens/>
            <hr></hr>
            <Kids/>          
            <Footer/>
        </div>
    )
}