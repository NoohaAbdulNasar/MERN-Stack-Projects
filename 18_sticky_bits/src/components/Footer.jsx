import React from "react";

function Footer(){
    const date= new Date().getFullYear();
    return (
        <footer>
            <p>Copyright ⓒ Nooha {date}. All rights reserved.</p>
        </footer>
    )
}

export default Footer;