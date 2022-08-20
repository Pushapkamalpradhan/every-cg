import React, { useEffect, useState } from "react";
import axios from 'axios';
//import LeftSiderBar from '../../SideBar/LeftSider/LeftSider'
import { useParams, Link,useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from 'universal-cookie';
import LeftSiderBar from '../../SideBar/LeftSider/LeftSider'
import { authenticationService } from '../../../Component/Form/_services';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
	import loaderimage from '../../../images/loader-orange.gif'
import Loader from 'react-loader-spinner';
const NewProductShop = () => {
	


const Loading = () =>
    <div className="col-md-10 position-relative loder_imag">
        <img src={loaderimage} />

    </div>
	
const [isLoading, setLoading] = useState(true)
    const { currentUser, gfsaghsajk } = useState();
    const [ outstock, getResponsse ] = useState();
    const { alias } = useParams();
    const [productlist, SetPost, sessionid, session_id] = useState({});
	//  const [post, setPost] = useState(null)
    authenticationService.currentUser.subscribe(x => this.setState({
        currentUser: x,
    }));
    if (localStorage.getItem("cookieid") === null && localStorage.getItem("currentUser") === null) {
        //let randomnumber =Math.random()
        let setItems = Math.random() * 500000;
        setItems = parseInt(setItems);
        let cookiesset = localStorage.setItem('cookieid', JSON.stringify(setItems));
    }
    /* if (localStorage.getItem('currentUser') !== null) {
        console.log(`user is login`);
        localStorage.removeItem("cookieid");
    } */
    //localStorage.removeItem("cookieid");
    //console.log('cookiesg',sr);
    let cookieids = localStorage.getItem('cookieid');
    //console.log('cookiesg', cookieids);
    const [cookies, setCookie, getCookie] = useCookies();
    /*  function handleCookie() {
        let session_id = setCookie("sessionid", "qwertya", {
          path: "/"
        });
      //}  */
    //const cookies = new Cookies();
    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(`https://dev.demo-swapithub.com/ecomm/api/productsnew/${alias}`);
                SetPost(data[0]);
                //console.log('data',data[0]);
				setLoading(false) //stop loading when data is fetched
            } catch (err) {
                console.error(err);
            }
        };
        fetch();
    }, []);
    function getRandomInt(max) {
        let ggg = Math.floor(Math.random() * max);
    }
    //console.log('11',Math.random());
    let randomnumber = Math.random()
    //console.log('testrandom', randomnumber);
	 
/*Quantity Update*/	 
  const [qunatity, setQunatity] = useState('1');
  const handleChangeQty = event => {
   setQunatity(event.target.value);
   // console.log('value is:', event.target.value);
  };
/*End Quantity Update*/	 	

    let addToCart = async (e) => {

        if (localStorage.getItem("currentUser")) {
            e.preventDefault();
            let product_id = e.currentTarget.id;
           // console.log(product_id);
            let tokend = JSON.parse(localStorage.getItem('currentUser')).token;
            //let token = localStorage.getItem('currentUser');
            //console.log(tokend);
            let qty = qunatity;
            const prod = JSON.stringify({ product_id: product_id, qty: qunatity });
            //console.log(prod);
            //const myJSON = JSON.stringify(obj);
            //try {
            await axios.post("https://dev.demo-swapithub.com/ecomm/api/add_cart", prod, {
                headers: {
                    "Content-Type": 'application/json',
                    // "Accept": 'application/json',
                    "Authorization": `Bearer ${tokend}`
                    //Authorization:localStorage.getItem('token')
                    // Authorization: "Bearer" + localStorage.getItem('currentUser','token')
                }
            }).then(responselogin => {
               // console.log('responselogin', responselogin);
                if (responselogin.status == '200') {
					//getResponsse(response.response.data.msg);
				
					//getResponsse(responselogin.data.msg);
					//getResponsse('Example error message!');
                    //window.location.href = response.url;
                    window.location = '/cart';
                }
            }).catch(responselogin => {	
	
				//console.log('responselogin',responselogin.response.data.msg);
                getResponsse(responselogin.response.data.msg);

			})
        }
        else {
            e.preventDefault();
            let product_id = e.currentTarget.id;

            //console.log(product_id);
            /*  setCookie("sessionid", randomnumber, {
                path: "/"
              }); */
            //let cookiiies = cookies.sessionid;
            //console.log('cookiiies',cookiiies);
            const prod = JSON.stringify({ product_id: product_id, qty: qunatity, sessionid: cookieids });
           // console.log(prod);
            await axios.post("https://dev.demo-swapithub.com/ecomm/api/add-to-cart", prod, {
                headers: {
                    "Content-Type": 'application/json',
                }
            }).then(response => {
                //console.log('respvalue', response);
                if (response.status == '200') {
                    //window.location.href = response.url;
                  //  console.log('respvalueasdas');
                    window.location = '/cart';
                } 
            }).catch(response => {				
				//console.log('',response.response.data.msg);
                getResponsse(response.response.data.msg);
				
            })
        }
        //.then(item=> console.log('respvalue',item))
        /* } catch (err) {
        console.log(err);
        } */
    };
    const tagsget = (productlist.tags);
    const history = useHistory();
    function goToCategory(tagsgets) {
        history.push(`/tags/${tagsgets.alias}`, { tagId: tagsgets.alias }); // This doesn't work
    }

    const imagegallery = (productlist.images);
    const relatedProduct = (productlist.related);
	
    return (
        <div className="container-fluid p-0 ">
	        <div className="card">
                <div className='row m-0'>
                    <LeftSiderBar />
                    <div className='col-md-10 width_int'>
						{isLoading ? (   //Checkif if is loading
								<Loading />
								) : (
                        <div className="row g-0 product-single-main mb-0">
                            <div className="col-md-6">
                                <div className="d-flex flex-column justify-content-center">
							
                                    <div className="thumbnail_images">
                                        <Carousel
                                            autoPlay={false}
                                            showArrows={false}
                                            infiniteLoop={false}
                                            interval={100000}
                                            stopOnHover={false}
                                            showThumbs={true}
                                            showStatus={false}
                                            showIndicators={false}
                                        >
                                            <img src={'https://dev.demo-swapithub.com/ecomm/' + productlist.image} alt={productlist.name} />
                                            {(imagegallery || []).map((datass, idxx) => <img key={datass.id} src={'https://dev.demo-swapithub.com/ecomm/' + datass.image} />)}

                                            {/* {(imagegallery || []).map(pp => (<p key={pp.id}  />))} */}
                                        </Carousel>
                                    </div>
								
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-3 right-side"><h2>{productlist.name}</h2>			
					
					
                                    <p className="product_ditel_price">${productlist.price}</p>
                                    <div className="buttons d-flex flex-row gap-3">
									    <input type="number" id="qunatity" min="1" max="999" name="qunatity" onChange={handleChangeQty} value={qunatity} className="type-qty" />
										
                                        <button className="btn btn-dark" id={productlist.id} onClick={addToCart}>Add to Cart</button>
										
                                        {/* <div className="view-cart">
                                            // <Link to={`/Cart/${productlist.alias}`} className='Shop_now_page'>View Cart</Link> 
                                            <Link to='/Cart' className='Shop_now_page'>View Carts</Link>
                                        </div> */}
                                    </div>
									{outstock && (
											<div className="out-ofstock-msg">{outstock}</div>
										)}
                                    <div className="mt-2 pr-3 content">
									<h4><strong>Product Detail</strong></h4>
                                        <p className="text-muted" dangerouslySetInnerHTML={{ __html: productlist.content }} ></p>
                                    </div>
									  <div className="tag_btn"><span>Tags:-</span>
									  
                                        {(tagsget || []).map((tagsgets,count) =>
                                            <button onClick={() => goToCategory(tagsgets)}>	
											
											{count > 0  ? <div><span>,</span>{tagsgets.name}</div> :<div>{tagsgets.name}</div>}
                                            </button>)}
                                    </div><br/>
									

								
                                </div>
                            </div>
    {(relatedProduct || []).length === 0 ? <p></p> :                      
<div className="related_news row product-related">
    <h3>Related Products</h3>
	{(relatedProduct || []).map((relatedproducts) =>
    <div className="col-6 col-md-4 col-xl-3 with_hund_pt mt-3">
        <div className="com_cover_div">
            <div className="text-black featured_Products">
                <div className="featured_Products_image card ">
				
				<img src={"https://dev.demo-swapithub.com/ecomm/" + relatedproducts.image}
                        alt="Test adipisicing elit, sed"/>
                    <div className="Shop_now"><a className="Shop_now_page" href="/newproductshop/test-product">Shop Now </a>
                    </div>
                    <div className="shop_price"><span>${relatedproducts.price}</span></div>
                </div>
            </div>
            <div className="card-body">
                <div className="text-center">
                    <h5 className="card-title">{relatedproducts.name}</h5>
                    <p className="text-muted" numberOfLines={2} ellipsizeMode='end'
                     dangerouslySetInnerHTML={{ __html: relatedproducts.content }}></p>
                </div>
            </div>
        </div>
    </div>
	)}
</div>
	}
						
						
						</div>
						)}
                    </div>
					
                </div>
            </div>
        </div>
    );
};

export default NewProductShop;
