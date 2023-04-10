import React, { useState } from "react";
import "./contact.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Contact = () => {
    const [mail, setMail] = useState("");

    const handleMail = (e) => {
        e.preventDefault();

        console.log(mail);

        setMail("");
    };

    return (
        <div className="contact">
            <div className="wrapper">
                <span>BE IN TOUCH WITH US:</span>
                <div className="mail">
                    <input type="text" value={mail}
                        placeholder="Enter your email..." 
                        onChange={(e)=> setMail(e.target.value)}
                    />
                    <button onClick={handleMail}>JOIN US</button>
                </div>
                <div className="icons">
                    <FacebookIcon />
                    <InstagramIcon />
                    <TwitterIcon />
                    <GoogleIcon />
                    <PinterestIcon />
                </div>
            </div>
        </div>
    );
};

export default Contact;