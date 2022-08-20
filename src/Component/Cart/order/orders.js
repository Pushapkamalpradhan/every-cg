import React, { useState, Component} from "react";
import axios from 'axios'
import LeftSiderBar from '../../../Component/SideBar/LeftSider/LeftSider'
import { useCookies } from "react-cookie";
import Cookies from 'universal-cookie';
import { authenticationService } from '../../../Component/Form/_services';
import { withRouter,Link } from 'react-router-dom';
import loder from '../../../images/loader-orange.gif'
import Loader from 'react-loader-spinner';

const Loading = () =>
    <div className="col-md-10 position-relative loder_imag">
        <img src={loder} />

    </div>
class Orders extends React.Component {

//export default class Orders extends Component {
constructor() {
        super();
        this.state = {
            users: null,
			currentUser: null,
			loading: true,
        }        
    }	

componentDidMount() {
	this.isLoading = setTimeout(() => { this.setState({ loading: false }) }, 2300);
	 authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x,
    })); 
	 if(localStorage.getItem("currentUser")) {	
	 
 let tokend = JSON.parse(localStorage.getItem('currentUser')).token;
// let orderIds = JSON.parse(localStorage.getItem('orderIds'));
 //console.log(orderIds);
 /*    authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x,
    })); */
	 const headers = { 
      "Content-Type": 'application/json',
	   "Authorization": `Bearer ${tokend}`
	  
    }; 
    //axios.get(`https://dev.demo-swapithub.com/ecomm/api/orders/${orderIds}`)
    axios.get('https://dev.demo-swapithub.com/ecomm/api/orders', { headers })
        .then(response => this.setState({ orderid: response.data.orders
        //  orderemail: response.data.order.email,
       }));
	 }
}
   goToCategory = (ordersdata) => {
        const { history } = this.props;
        history.push(`/orderdetail/${ordersdata.id}`,{ catId: ordersdata.id});
		//history.push({ catname: item.name })
		//{`/orderdetail/${ordersdata.id}`} 
    }
	timer = () => setTimeout(() => {
		this.setState({ loading: false })
	}, 2300);
  render() {
   const { orderid, orderemail,subtotal,first_name,loading} = this.state;
   const { currentUser } = this.state;
  //  console.log('orderData',orderid);
    return (
	<div className="container-fluid orders-page">		
		<div className="row orders-page">
		<LeftSiderBar />
		
    
		{!currentUser ?
			<div className="col-md-10 orders-col orders-inner width_int" >
				For accessing this Page need to Login First
			</div>
		:
			<div className="col-md-10 orders-col orders-inner overflow_add  width_int" >
			  {loading ? (<Loading />)
      : (
		<div className="loader-div">
				<h2 className="Orders_List">Orders List</h2>
				<table className="cart-table table box table-bordered user_cart_table">
					<thead> 
						<tr>			
							<th>S.No.</th>					
							<th>Name</th>
							<th>Email</th>
							<th>Total</th>
							<th>View Detail</th>					
						</tr>
					</thead>
					<tbody>
						{(orderid || []).map((ordersdata, i) => 
							<tr className="row_cart">
								<td>{i+1}</td>
								<td>{ordersdata.first_name}</td>					
								<td>{ordersdata.email}</td>
								<td>{ordersdata.total}</td>
								<td>
									<button onClick={() => this.goToCategory(ordersdata)}>View Order </button>
								</td>
							</tr>
						)}
					</tbody>
				</table> 
				
				</div>
	  )}
			</div>
		}    
		
		</div>     
	</div>     
   );
  }
}
export default withRouter(Orders);