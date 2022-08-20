import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import home from '../../../images/home-1.png';
import home2 from '../../../images/home-2.png';
import category from '../../../images/category.png';
import categoryw from '../../../images/categoryw.png';
import News from "../../../images/news.png";
import newsw from '../../../images/newsw.png';
import shop from '../../../images/shop.png';
import shopw from '../../../images/shopw.png';
import product from '../../../images/product.png';
import productw from '../../../images/productw.png';
import {  NavLink } from "react-router-dom";
import Logo from '../../../images/logo.png'
export default function LeftSiderBar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (

        <div className=" col-md-2 leftSideBar_mane_dv togial_menu_div">
            <button className='open_tagle' onClick={showSidebar}><i class="fa fa-bars"></i></button>
           
                <div  className={sidebar ? 'nav-menu leftSideBar active' : 'nav-menu leftSideBar'}>
        <div onClick={showSidebar}>
        <span className="logo_imag_togel"><img src={Logo} alt="dsf" /></span>
        <button className='close_tagle' onClick={showSidebar}><i class="fa fa-close"></i></button>
            <ul>
                <li> 
                    <NavLink to="/" exact activeClassName="navbar__link--active" className="navbar__link" >
                        <img src={home} alt="home-icon"  className="black_img"/>
                        <img src={home2} alt="home-icon" className="d-none white_img" />
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/category" activeClassName="navbar__link--active" className="navbar__link">
                        <img src={category} alt="home-icon" className="black_img" />
                        <img src={categoryw} alt="home-icon" className="d-none white_img"/>
                        Category
                    </NavLink>
                </li>
                {/* <li class="dropdown dropdownHover">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown button
                    </button> 
                    <img src={category} alt="home-icon" className="black_img" /> 
                     <img src={category2} alt="home-icon" className="d-none white_img"/>
                  <Link to="/Category">Category</Link> 
                    <ul class="dropdown-menu dropdownHoverMenu">
                        <li><i class='fa fa-list'></i><Link to="/ProductCategory">Category</Link></li>
                    </ul> 
                </li> */}
                <li>
                    <NavLink to="/products" activeClassName="navbar__link--active" className="navbar__link">
                        <img src={product} alt="home-icon" className="black_img"  />
                        <img src={productw} alt="home-icon" className="d-none  white_img" />
                        Product
                    </NavLink>
                </li>
				  {/* classs mobile_show */}
                <li className="nav-item mobile_show">
                    <NavLink to="/news" activeClassName="navbar__link--active" className="navbar__link">
                        <img src={News} alt="home-icon" className="black_img" />
                        <img src={newsw} alt="home-icon" className="d-none  white_img" />
                        News
                    </NavLink>
                </li>
				{ /*  <li className="nav-item mobile_show">
                    <NavLink to="/products" activeClassName="navbar__link--active" className="navbar__link">
                        <img src={shop} alt="home-icon" className="black_img" />
                        <img src={shopw} alt="home-icon" className="d-none  white_img" />
                        Shop
                    </NavLink>
</li> */}
            </ul>
        </div>
        </div>
        </div>
       
        
        
    )
}