import React, { useEffect, useState } from "react";
import axios from 'axios';
import LeftSiderBar from '../../SideBar/LeftSider/LeftSider'
import { useParams, Link } from "react-router-dom";
const ProductShop = () => {
    const { alias } = useParams();
    const [productlist, SetPost] = useState({});
    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(`https://dev.demo-swapithub.com/ecomm/api/productsnew/${alias}`);
                SetPost(data[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetch();
    }, []);
    //let token = JSON.parse(localStorage.getItem('token')).token;
    //console.log(token);

    // const [first_name, setName] = useState("");
    //const [prod_id, setId] = useState("");
    // const [token, setToken] = useState("");
    // const [email, setEmail] = useState("");
    //  const [password, setPassword] = useState("");
    //  const [Message, setMessage] = useState("");
    /*     function myFunction(e) {
      alert(e.currentTarget.title); 
    }
     */
    //let item = { product_id,token,qty }
    let addToCart = async (e) => {
        e.preventDefault();
        let product_id = e.currentTarget.id;
        console.log(product_id);
        let token = JSON.parse(localStorage.getItem('currentUser')).token;
        //let token = localStorage.getItem('currentUser');
        console.log(token);
        //let qty = 1
        const prod = JSON.stringify({ product_id: product_id, qty: 1 });
        console.log(prod);
        //const myJSON = JSON.stringify(obj);
        //try {
        await axios.post("https://dev.demo-swapithub.com/ecomm/api/add_cart", prod, {
            headers: {
                "Content-Type": 'application/json',
                // "Accept": 'application/json',
                "Authorization": `Bearer ${token}`

                //Authorization:localStorage.getItem('token')
                // Authorization: "Bearer" + localStorage.getItem('currentUser','token')

            }
        });

        //.then(item=> console.log('respvalue',item))

        /*   if (res.status === 200) {
             
              SetPost("");
             
             
              setMessage("Add to cart");
          } else  {
              setMessage("Some error occured");
          }  */
        // else  {
        //     setMessage("this email is already");
        // }

        /* } catch (err) {
            console.log(err);
        } */
    };
    return (

        <div className="container-fluid p-0">
            <div className="card">
                <div className='row m-0'>
                    <LeftSiderBar />
                    <div className='col-md-10 width_int'>
                        <div className="row g-0 product-single-main">
                            <div className="col-md-6 border-end main_image">
                                <div className="d-flex flex-column justify-content-center">
                                    <div className="main_image">
                                        <img src={'https://dev.demo-swapithub.com/ecomm/' + productlist.image} alt={productlist.name} />
                                    </div>                                   
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-3 right-side"><h2>{productlist.name}</h2>
                                    <div className="mt-2 pr-3 content">
                                        <p className="text-muted" dangerouslySetInnerHTML={{ __html: productlist.content }} ></p>
                                    </div>
                                    <h3>${productlist.price}</h3>

                                    <div className="buttons d-flex flex-row mt-5 gap-3">

                                        <button className="btn btn-dark" id={productlist.id} onClick={addToCart}>Add to Cart</button>
                                        <div className="view-cart">
                                            { /* <Link to={`/Cart/${productlist.alias}`} className='Shop_now_page'>View Cart</Link> */}
                                            <Link to='/' className='Shop_now_page'>View Cart</Link>
                                        </div>
                                    </div>
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
