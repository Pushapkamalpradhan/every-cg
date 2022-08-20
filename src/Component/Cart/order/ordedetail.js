import React, { useEffect, useState, Component } from "react";
import axios from 'axios'
import LeftSiderBar from '../../../Component/SideBar/LeftSider/LeftSider'
import { useCookies } from "react-cookie";
import Cookies from 'universal-cookie';
import { authenticationService } from '../../../Component/Form/_services';
import { useHistory, Link, useLocation, useParams } from "react-router-dom";
const Orderdetail = () => {
  // const location = useLocation();
  const location = useLocation();
  //console.log('catid: ', catId)
  //const CatName = location.state.catId;
  const [orderlist, orderDetail] = useState({});
  const [orderlistprod, orderProductdetail] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`https://dev.demo-swapithub.com/ecomm/api/orders/${location.state.catId}`);
        orderDetail(data.order);
        //order_total: response.data.products,
        orderProductdetail(data.products);
       // console.log('data', data.products);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);
  const orderlistprods = (orderlistprod);
  //console.log('imagegallerys', orderlistprods);
  return (
    <div className="container-fluid orders-detail-page">
      <div className="row ordersdetail-row">
        <div className="row ordersdetail-page">
          <LeftSiderBar />
          <div className="col-md-10 orderdetails-col ordersdetail-inner width_int" >
            <div className="order-detail-main">
              <h2>Order Information</h2>
              <div className="detail-title">
                <span>
                  Order ID:-</span>{orderlist.id}
              </div>
              <div className="detail-title">
                <span>Customer Name:-</span>{orderlist.first_name} {orderlist.last_name}
              </div>
              <div className="detail-title">
                <span>Email:-</span>{orderlist.email}
              </div>
              <div className="detail-title">
                <span>Address:-</span>{orderlist.address1} {orderlist.address2}
              </div>
              <div className="detail-title">
                <span>Phone:-</span>{orderlist.phone}
              </div>
			   <div className="detail-title">
                <span>Date and Time:-</span>{orderlist.created_at}
              </div>

              <div className="detail-title">
                <span></span>
              </div>

            </div>
			<div className="overflow_add ">
            <table className="cart-table table box table-bordered Order_Details_user_get">

              <h2>Order Details</h2>
              <tr>
                <td>
                  <table className="Product_table"  >
                    <thead>
                      <tr className="table_data_h">
                        <th>
                          No.
                        </th>
                        <th>
                          SKU
                        </th>
                        <th>
                          Product Name
                        </th>
                        <th>
                          Product Image
                        </th>
                        <th>
                          Quantity
                        </th>
                        <th>
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="table_data_tbody" >
                      {(orderlistprods || []).map((order_totals, i) =>
                        // <p>{order_totals.name}</p>
                        <tr className="table_data_b" >
                          <td>
                            {i + 1}
                          </td>
                          <td>
                            {order_totals.sku}
                          </td>
                          <td>
                            {order_totals.name}
                          </td>
                          <td className="table_data_images">
                            {/* <img src={product} /> */}
                            <img src={'https://dev.demo-swapithub.com/ecomm/' + order_totals.image} alt={order_totals.name} />
                          </td>

                          <td>
                            {order_totals.qty}
                          </td>
                          <th>
                            ${order_totals.total_price}
                          </th>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="Total_pr">Total:- ${orderlist.subtotal}</div>
                </td>
              </tr>
              <tr><tr>
              </tr>
                <td>

                </td>
              </tr>
            </table>
			</div>
          </div>
        </div>
      </div>
    </div>



  )
}
export default Orderdetail;
