import { Footer } from "../Components/Footer";
import { Navbar } from "../Components/Navbar";
import { Orders } from "../Components/Orders";


export function OrdersPage(){
    return(
        <div>
            <Navbar/>
            <Orders/>
            <Footer/>
        </div>
    )
}