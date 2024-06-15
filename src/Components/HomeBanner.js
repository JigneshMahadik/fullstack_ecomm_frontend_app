import "../css/HomeBanner.css"
import bannerPic from "../assets/icons/bannerPic.jpg"

export function HomeBanner(){
    return(
        <div>
            <div id="banner-container">
                <div id="banner-left-cont">
                    <h1>Just one click away...</h1>
                    <div id="banner-caption">
                        <p>New collection for you,</p>
                        <p>Don't miss it out to check.</p>
                    </div>
                    {/* <p>Around 1023 product are already sold</p> */}
                    <button id="btn-collection">New Collection</button>
                </div>
                <div id="banner-right-cont">
                    <div id="banner-pic">
                        <img src={bannerPic} />
                    </div>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}