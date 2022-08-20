import React, { useEffect, useState } from "react";
import axios from 'axios';
import cart from '../images/cart.png'
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'
import Home from '../Component/Home'
import NavBar from '../Component/NavBar'
import SearchApi from '../Component/Everycg/SearchApiHeader'
import LeftSider from '../Component/SideBar/LeftSider/LeftSider'
import { authenticationService } from '../Component/Form/_services';
import { history } from '../Component/Form/_helpers';
import { useCookies } from "react-cookie";
import SearchCom from '../Component/SearchCom'
import logout from '../images/logout.png';
import logout1 from '../images/logout1.png';
import order from '../images/order.png';
import order1 from '../images/order1.png';
import userprofile from '../images/user-profile.png';
import userprofile1 from '../images/user-profile1.png';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      userService: null,
      CartItems: null,
      show: false,
      show2: false
    };
  }
  
  componentDidMount() {
    /*---With Login----*/
    if (localStorage.getItem("currentUser")) {
      let tokend = JSON.parse(localStorage.getItem('currentUser')).token;
      authenticationService.currentUser.subscribe(x => this.setState({
        currentUser: x,
      }));
      const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${tokend}`
      };
      axios.get('https://dev.demo-swapithub.com/ecomm/api/cart_count', { headers })
        .then(response => this.setState({
          CartItems: response.data.cartCount
        }));
    } 
	else {
      let cookiid = localStorage.getItem('cookieid');
    //  console.log('cookieid', cookiid);
      const prod = JSON.stringify({ sessionid: cookiid });
      authenticationService.currentUser.subscribe(x => this.setState({
        currentUser: x,
      }));
      const headers = {
        "Content-Type": 'application/json',
      };
      axios.post('https://dev.demo-swapithub.com/ecomm/api/cart_total', prod, { headers })
        .then(response => this.setState({
          CartItems: response.data.cartCount
        }));
    }
  }
  /*----------------Logout Condition Remove token from localstorage-------------------------*/
  logout(setToken) {
    authenticationService.logout();
    //localStorage.removeItem('currentUser');
    //currentUserSubject.next(null);
    localStorage.removeItem("token");
    //setToken(null)
    //localStorage.clear();
    //window.location.reload = '/';
   /*  if (document.referrer !== document.location.href) {
      //setTimeout(function() {
      document.location.reload('/')
      // }, 1000);
    } */
	setTimeout(function() {
		var logoutlocation = "/login";
		window.location.href = logoutlocation;
		//window.location.reload(); 
	}, 1000);
    //history.push('/');
  }
  
  render() {
    const { CartItems } = this.state;
    //const sssss = console.log('CartItemsCartItems', CartItems);
    const { currentUser } = this.state;
    return (
      <div className="header_div">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse container-fluid" id="navbarSupportedContent">
            <div className="col-md-6 d-flex nab_left">
              <Link className="navbar-brand col-md-3" to="/" name={Home}> <img src={logo} alt="dsf" /></Link>
                <LeftSider />
              <NavBar />
            </div>
            <div className="col-md-6 d-flex nab_right">
              <div className=" cart">
                <Link to="/cart" className='cart_btn_dt'>
                  <img src={cart} alt="cartitem" />
                  <p className='queant'>{CartItems}</p>
                </Link>
              </div>
				<SearchCom />
				<SearchApi />
              <div className="mobile_hide">
                         
			    {!currentUser &&
					<div className="register_loginout_login">
						<div class="dropdown">
							<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
							  <i class="fa fa-user-circle-o"></i>
							</button>
							<ul className="register_or_login ropdown-menu" class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
							  <li>
								<Link className="nav-link"
								  to="/register"
								>Register</Link>
							  </li>
							  <li>
								<Link className="nav-link"
								  to="/login"
								>Login</Link>
							  </li>
							</ul>
						</div>
					</div>
				}
				{currentUser &&
					<div className="register_or_login login_out">
					  <div class="dropdown">
						<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
						  <i class="fa fa-user-circle-o"></i>
						</button>
						<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
						 
						  <li>
							<Link class="dropdown-item" to="/orders">
							  <img src={order} alt="home-icon" className="black_img" />
							  <img src={order1} alt="home-icon" className="d-none white_img" />
							  Orders
							</Link>
						  </li>
						  <li>
							<Link class="dropdown-item" to="/userprofile">
							  <img src={userprofile} alt="home-icon" className="d-none white_img" />
							  <img src={userprofile1} alt="home-icon" className="black_img" />
							  User Profile
							</Link>
						  </li>
						  <li>
							<Link onClick={this.logout} className="dropdown-item">
							  <img src={logout} alt="home-icon" className="black_img" />
							  <img src={logout1} alt="home-icon" className="d-none white_img" />
							  Logout
							</Link>
						  </li>
						</ul>
					  </div>
					</div>
				}		   
              </div>
            </div>
          </div>
        </nav>
        {/* <ManeBody /> */}
      </div>
    );
  }
}
export default Header;
