// import React from "react";
// export default function ProductDetailNew() {
//   return (
//     <div >
//      <h1>hello</h1>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from 'axios';
import LeftSiderBar from '../../Component/SideBar/LeftSider/LeftSider'
import { useParams } from "react-router-dom";
  const ProductShop = () => {
  const { id } = useParams();
  const [productlist, SetPost] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const {data} = await axios.get(`https://dev.demo-swapithub.com/ecomm/api/category-products/${3}`);
        SetPost(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);
  return (

    <div className="container-fluid p-0">
      <div className="card">
        <div className='row m-0'>
          <LeftSiderBar />
          <div className='col-md-10'>
            <div className="row g-0">
              <div className="col-md-6 border-end">
                <div className="d-flex flex-column justify-content-center">
                  <div className="main_image">
                    <img src={"https://i.imgur.com/TAzli1U.jpg"} id="main_product_image" width="350" alt="dsfs" />
                  </div>
                  <div className="thumbnail_images">
                    <ul id="thumbnail">
                      <li>
                        <img src={"https://i.imgur.com/w6kEctd.jpg"} id="main_product_image" width="70" alt="dsfs" />
                      </li>
                      <li>
                        <img src={"https://i.imgur.com/w6kEctd.jpg"} id="main_product_image" width="70" alt="dsfs" />
                      </li>
                      <li>
                        <img src={"https://i.imgur.com/w6kEctd.jpg"} id="main_product_image" width="70" alt="dsfs" />
                      </li>
                      <li>
                        {/* <img onclick="changeImage(this)" src="https://i.imgur.com/6ZufmNS.jpg" width="70" alt="dsfs" /> */}
                        <img src={"https://i.imgur.com/w6kEctd.jpg"} id="main_product_image" width="70" alt="dsfs" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 right-side">
                  <h2>{productlist.name}</h2>
                  {/* <div className="mt-2 pr-3 content">
                    <p className="text-muted" dangerouslySetInnerHTML={{ __html: productlist.content }} ></p>
                  </div> */}
                  {/* <h3>$430.99</h3> */}
                  <div className="ratings d-flex flex-row align-items-center">
                    {/* <div className="d-flex flex-row">
                      <i className='bx bxs-star' ></i>
                      <i className='bx bxs-star' ></i>
                      <i className='bx bxs-star' ></i>
                      <i className='bx bxs-star' ></i>
                      <i className='bx bx-star' ></i>
                    </div> */}
                    {/* <span>441 reviews</span> */}
                  </div>
                  {/* <div className="buttons d-flex flex-row mt-5 gap-3">
                    <button className="btn btn-outline-dark">Buy Now</button>
                    <button className="btn btn-dark">Add to Card</button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShop;