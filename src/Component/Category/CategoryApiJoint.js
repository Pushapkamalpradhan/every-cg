import React, { useEffect, useState } from "react";
import axios from 'axios';
import categorybanner from '../../images/category-banner.jpg'
import { useHistory, Link, useLocation } from "react-router-dom";
import topInformationimg from '../../images/bg1.jpg'
import loaderimage from '../../images/loader-orange.gif'

const CategoryApiJoint = () => {
	
	
	const Loading = () =>
    <div className="col-md-10 position-relative loder_imag">
        <img src={loaderimage} />
    </div>
	const [isLoading, setLoading] = useState(true);
    //const { location } = useLocation();
    const location = useLocation();
   // console.log('catid: ', location.state.catId)

    //const CatName = location.state.catname;
    //console.log('catName: ', CatName)
    const [productlist, SetPost] = useState([]);
    

    useEffect(() => {
        //console.log(location.state.catname); 
        //console.log(location.state.detail);
        fetch();
    }, []);
    const slugvalue = window.location.pathname.split('/')[2];
    const fetch = async () => {
        try {
            const { data } = await axios.get(`https://dev.demo-swapithub.com/ecomm/api/category-products/${slugvalue}`);
            console.log('data: ', data);
            SetPost(data);
			setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };
		
    return (
	<>
	{isLoading ? (   //Checkif if is loading
								<Loading />
								) : (
								
        <div className="col-md-10 category_page width_int">
	
            <div className='banner-sect-category-detail banner-sect-category' style={{ background: `url(${categorybanner})`, }}>
                <div className="breadcrumb">
				
				
				<Link to="/Category" >Category </Link> <span className="catname-capt"> <i class="fa fa-angle-right"></i>{slugvalue} </span> </div>
                <h2 className="cat-title">{slugvalue}</h2>
                <p className="content-category">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
            </div>
            <div className="category-products container-fluid py-2 FeaturedProductsPage" >
                <div className="row category-products-row">
                    {productlist.map(product => {
                        return (
                            <div className="col-sm-6 col-md-4 col-xl-3 mt-3">
                                <div className="com_cover_div">
                                    <div className="text-black featured_Products">
                                        <div className='featured_Products_image card ' key={product._id}>
                                            {/* <Link to={'/ProductShop/' + item.alias} className='Shop_now_page'> */}
                                            <img src={'https://dev.demo-swapithub.com/ecomm/' + product.image} alt={product.name} />
                                            {/* </Link> */}
                                            <div className='Shop_now'>
                                                <Link to={`/newproductshop/${product.alias}`} className='Shop_now_page'>Shop Now </Link>
                                            </div>
                                            <div className='shop_price'>
                                                <span >$ {product.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="text-center">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="text-muted"
                                                numberOfLines={2} ellipsizeMode='end'
                                                dangerouslySetInnerHTML={{ __html: product.content }} ></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
			
        </div>
	
			)}
				</>
    );
};
export default CategoryApiJoint;
