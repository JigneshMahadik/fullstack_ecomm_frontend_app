import "../css/BestDealsBanner.css";
import bestDealsPic from "../assets/icons/offer2.jpg"

export function BestDealsBanner(){
    return(
        <div>
            <div id="deals-banner-container">
                <div id="deals-left-cont">
                    <h1>"Shop the Best Deals Today"</h1>
                    <div id="deals-caption">
                        <p>Huge discounts, incredible savings. Shop now!</p>
                        <p>"Amazing deals on the latest products. Act fast!"</p>
                    </div>
                    {/* <p>Around 1023 product are already sold</p> */}
                    <button id="btn-explore">Explore</button>
                </div>
                <div id="deals-right-cont">
                    <div id="deals-pic">
                        <img src={bestDealsPic} />
                    </div>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}