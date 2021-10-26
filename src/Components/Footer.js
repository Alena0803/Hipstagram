import React from "react";
import {Link} from "react-router-dom";

const Footer = () => 
<>
    <footer className="page-footer">
        <div className="container text-center ">
            <div className="row">
                <div className="col-md-6 mb-md-0 mb-3">
                    <ul className="list-unstyled">
                        <li><Link to="#">About</Link></li>
                        <li><Link to="#">Blog</Link></li>
                        <li><Link to="#">Help</Link></li>
                        <li><Link to="#">Privacy</Link></li>
                        <li><Link to="#">Terms</Link></li>
                        <li><Link to="#">Hashtags</Link></li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="footer-copyright text-center py-3">
            <Link color="inherit" href="/">
                Copyright © Hipstagram 
            </Link>{' '}
            <p>
                {new Date().getFullYear()}
            {'.'}
            </p>
            
        </div>

    </footer>
</>

export default Footer