import React from "react";
import { Link } from 'react-router-dom';
export default function navban (){
    return(
		<ul className="navbar-nav col-md-4">
			<li className="nav-item ">
				<Link to="/news" className="nav_link">News</Link>
			</li>
			<li className="nav-item">
				<Link to="/products" className="nav_link">Shop</Link>
			</li>
		</ul>      
    )
}