import "../css/Sale.css"
import saleImg from  "../assets/images/sale.png"

export function Sale(){
    return(
        <div>
            <div id="sale-container">
                <div id="left-sale-cont">
                    <h1>Monsoon Season Sale Upto 40% Off</h1>
                    <p>Grap the best monsoon season sale</p>
                    <button>More</button>
                </div>
                <div id="right-sale-cont">
                    <div id="sale-img">
                        <img src={saleImg}/>
                    </div>
                </div>
            </div>
        </div>
    )
}