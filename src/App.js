import React from "react";
import About from '../src/Component/About'
import ProductDetails from '../src/Component/ProductDetail/productDetail'
import ProductDetailNew from '../src/Component/ProductDetail/productDetailNew'
import ProductShop from '../src/Component/Everycg/Products/ProductShop'
import Home from '../src/Component/Everycg/Home'
import NavBar from '../src/Component/Header'
import Cart from '../src/Component/Cart/Cart';
import Footer from '../src/Component/Footer'
import Register from "./Component/Form/Register";
import Login from "../src/Component/Form/Login"
import Thankyouregister from "../src/Component/Form/thank-you"
import './App.css';
import { authenticationService } from '../src/Component/Form/_services';
import { history } from '../src/Component/Form/_helpers';
import Search from '../src/Component/Everycg/Search'
import Category from '../src/Component/Category/Category'
import CategoryApiJoint from '../src/Component/Category/CategoryApiJoint'
import CategoryPage from '../src/Component/Category/CategoryPage'
import Products from '../src/Component/Everycg/Products/Products'
import ContactForm from '../src/Component/ContactForm/contactForm'
import FAQ from '../src/Component/faq/faq';
import News from '../src/Component/News/news'
import NewsDetail from '../src/Component/News/NewsDetail'
import BannerSlider from '../src/Component/Everycg/BannerSlider'
import NewProductShop from '../src/Component/Everycg/Products/NewProductShop'
import {
  BrowserRouter as Router,
  Switch,
  Route
  
} from "react-router-dom";
import Checkout from "./Component/Cart/checkout/checkout";
import Payment from "./Component/Cart/payment/payment";
import Thankyou from "./Component/Cart/thankyou/thankyou";
import Orders from "./Component/Cart/order/orders";
import Orderdetail from "./Component/Cart/order/ordedetail";
import Userprofile from "./Component/Cart/userprofile/userprofile";
import Tags from "../src/Component/Everycg/Products/tags/tags";
import  ScrollToTop from '../src/ScrollToTop';
console.log(React.version);

class App extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          currentUser: null,
          userService:null
          
      };
  }
  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({
        currentUser: x,
       // isAdmin: x && x.role === Role.Admin
    }));
    //userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
}


  logout() {
    authenticationService.logout();
    history.push('/Login');
}
render() {
  //const { currentUser } = this.state;
  return (
    <Router history={history}>
      <div class="container-fluid p-0">
          <NavBar />
    	<ScrollToTop>
			<Switch>
			  <Route exact path="/">
				<Home />
			  </Route>
			  <Route path="/about">
				<About />
			  </Route>
			  <Route path="/Search">
				<Search />
			  </Route>
			  <Route path="/Register">
				<Register />
			  </Route>
			  <Route path="/Cart">
				<Cart />
			  </Route>
			  <Route path="/checkout">
				<Checkout />
			  </Route>
			   <Route path="/thankyou">
				<Thankyou />
			  </Route>
			  <Route path="/orders">
				<Orders />
			  </Route>
			  <Route path="/orderdetail">
				<Orderdetail />
			  </Route>
			   <Route path="/userprofile">
				<Userprofile />
			  </Route>
			  <Route path="/tags">
				<Tags />
			  </Route>
			  <Route path="/payment">
				<Payment />
			  </Route>
			  {/* ContactForm */}
			  <Route path="/contact">
				<ContactForm />
			  </Route>
			  {/* ContactForm */}
			  {/* News */}
			  <Route path="/news">
				<News />
			  </Route>
			  <Route path="/newsdetail/:id">
				<NewsDetail />
			  </Route>
			  {/* News */}
			  {/* Products */}
			  <Route path="/products">
				<Products />
			  </Route>
			  {/* Products */}
			   {/* CategoryApi Route only   */}
			   <Route path="/Category">
				<Category />
			  </Route>
			  <Route path="/BannerSlider">
				<BannerSlider />
			  </Route>
			  <Route path="/CategoryApiJoint">
				<CategoryApiJoint />
			  </Route>
			  <Route path="/CategoryPage/:catId" component={CategoryApiJoint}>
				<CategoryPage />
			  </Route>
			  {/* CategoryApi Route only   */}
			  <Route path="/productDetailNew">
				<ProductDetailNew />
			  </Route>
			  <Route path="/thank-you">
				<Thankyouregister />
			  </Route>
			  <Route path="/productDetailNew">
				<ProductDetailNew />
			  </Route>
			  <Route path="/Login" component={Login} />
				 <Route path="/productDetail/:alias" component={ProductShop}>
				<ProductDetails />
			  </Route>
			   <Route path="/newproductshop/:alias" component={NewProductShop}>
				<NewProductShop /> </Route>
				<Route path="/faq">
				<FAQ />
			  </Route>
			</Switch>
		</ScrollToTop>
        <Footer />
      </div>
    </Router>
        );
      }
  }
  
  export { App }; 

// You can think of these components as "pages"
// in your app.