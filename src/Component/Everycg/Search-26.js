import React, { useEffect, useState } from 'react'
import LeftSiderBar from '../SideBar/LeftSider/LeftSider'
import axios from 'axios'
import categorybanner from '../../images/category-banner.jpg'
// category-banner.jpg
import { useParams, useLocation, Link } from "react-router-dom";
const search = _ => {
    const search = useLocation().search;
    const name = new URLSearchParams(search).get("keyword");
    const str = JSON.stringify({ keyword: name });
    const headers = {
        "Content-Type": 'application/json',
    };
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(`https://dev.demo-swapithub.com/ecomm/api/search/${name}`);
                setPosts(data);
                console.log(data)
            } catch (err) {
                console.error(err);
            }
        };
        fetch();
    }, []);
    return (
        <div className="container-fluid search_name_products">
            <div className="row">
                <LeftSiderBar />
                  <div className="col-md-10  width_int">
                    <div className='banner-sect-category' style={{ background: `url(${categorybanner})`, }}>
                        <div className="breadcrumb"><Link to="/" >Home </Link> > <span>  </span> Search</div>
                        <h2 className="cat-title">Search Result "{name}"</h2>
                       
                    </div>
					
                    {(posts || []).length === 0 ?  <div className="thank_you search_page_ans"><h4><strong>Sorry, but nothing matched your search terms. Please try again with some different keywords.</strong></h4></div>
						:
						
                    <ul className="search-products">
					
                        {posts && posts.map((myPost) =>
                            <li key={myPost._id}>
                                <Link to={`/newproductshop/${myPost.alias}`} >
                                    <span className='title'> {myPost.name}</span>
                                    <div className='seacrhImage'>
                                        <img src={'https://dev.demo-swapithub.com/ecomm/' + myPost.image} />
                                    </div>
                                </Link>
                            </li>
                        )
                        }
					
                    </ul>}
                </div>
            </div>
        </div>
    )
}

export default search;
