import "../css/Footer.css"
import linkedin from "../assets/icons/linkedin.png"
import insta from "../assets/icons/insta.svg"
import twitter from "../assets/icons/twitter.svg"
import fb from "../assets/icons/fb.svg"

export function Footer(){
    return(
        <div>
            <div id="footer">
                <div id="footer-cont-1">
                    <h1 id="footer-title">Contact us</h1>
                    <div id="footer-detail">
                        <p>Contact-Number : +91-8934820321</p>
                        <p>Email-Address : xyz@gmail.com</p>
                    </div>
                </div>
                <div id="footer-cont-2">
                    <h1 id="footer-title">Follow us</h1>
                    <div id="footer-detail-follow-us">
                        <img src={linkedin} className="follow-us-icon" alt="LinkedIn" />
                        <img src={insta} className="follow-us-icon" alt="Instagram" />
                        <img src={twitter} className="follow-us-icon" alt="Twitter" />
                        <img src={fb} className="follow-us-icon" alt="Facebook" />
                    </div>
                </div>
                <div id="footer-cont-3">
                    <h1 id="footer-title">About us</h1>
                </div>
            </div>
            <div id="copyright-footer">
                <p>©2024 xyz India Pvt. Ltd</p>
            </div>
        </div>
    )
}
