import "../css/CollectionBanner.css";
import collectionBannerPic from "../assets/icons/family1.jpg"

export function CollectionBanner(){
    return(
        <div>
            <div id="collection-banner-container">
                <div id="banner-left-cont">
                    <h1>All in one place</h1>
                    <div id="banner-caption">
                        <p>What are you waiting for ?</p>
                        <p>Explore our new collection specially made for family...</p>
                    </div>
                    {/* <p>Around 1023 product are already sold</p> */}
                    <button id="btn-explore">Explore</button>
                </div>
                <div id="banner-right-cont">
                    <div id="banner-pic">
                        <img src={collectionBannerPic} />
                    </div>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}