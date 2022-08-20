import React, { useState, Component } from "react";
import axios from 'axios'
import LeftSiderBar from '../../../Component/SideBar/LeftSider/LeftSider'
import { useCookies } from "react-cookie";
import Cookies from 'universal-cookie';
import SimpleReactValidator from "simple-react-validator";
import loder from '../../../images/loader-orange.gif'
import { authenticationService } from '../../../Component/Form/_services';

import Loader from 'react-loader-spinner';
const Loading =()=>
<div className="col-md-10 position-relative loder_imag">
	<img src={loder} />
</div>
export default class Userprofile extends Component {
constructor(props) {
    super(props);

    this.state = {
      postId: null,
      value: '',
	  loading: true,
	   errorMessagesss: ''
    }; 
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
   
  }


  validator = new SimpleReactValidator({
    messages: {
      email: "Please provide correct email @ address ",
      required: "This field is required",
    }

  });

  state = {
    first_name: "",
	address1:"",
    phone: "", 
	country:"",
    postcode: "", 
    last_name: "", 
	errorMessage: ''
  };

  handleSubmit = e => {
    e.preventDefault();  

    let first_name = this.state.first_name;
    let last_name = this.state.last_name;
    let address1 = this.state.address1;
    let phone = this.state.phone;
    let country = this.state.country;
    let postcode = this.state.postcode;
 if(localStorage.getItem("currentUser")) {	
      if (this.validator.allValid()) {     
        let tokend = JSON.parse(localStorage.getItem('currentUser')).token;
        const prod = JSON.stringify({
          first_name: first_name,
		  last_name: last_name,
          address1: address1,
          country: country,
		  phone: phone,
		  postcode: postcode,
          
        });
        const headers = {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${tokend}`
        };
        axios.post('https://dev.demo-swapithub.com/ecomm/api/user/update', prod, { headers })
          .then((response) => {

            if (response.status === 200) {
             
             // window.location = '/userprofile';
			this.setState({errorMessagesss: response.data.message});
			 // console.log('response',response.data.message);

            }
          })
          .catch((error) => {
            if (error.response) {
              this.setState({ errorMessage: error.response.data.error })
              //console.log(error.response.data.error);

            }
          });
	  } 
  else {
        this.validator.showMessages();
       
        this.forceUpdate();
      }
      }


  };


  componentDidMount() {
	   authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x,
    })); 
   this.isLoading = setTimeout(()=>{this.setState({loading: false})}, 2300);
    if(localStorage.getItem("currentUser")) {	
	  let tokend = JSON.parse(localStorage.getItem('currentUser')).token;
    
    const headers = { 
      "Content-Type": 'application/json',
	   "Authorization": `Bearer ${tokend}`
    };
	    Promise.all([
            fetch('https://dev.demo-swapithub.com/ecomm/api/user-detail',{ headers }),
            fetch('https://dev.demo-swapithub.com/ecomm/api/countries')
        ])
        .then(([response, countryinfo]) => Promise.all([response.json(), countryinfo.json()]))
		.then(([userData, countryData]) => {
			var data = userData;
			var countries = countryData;
		this.setState({
			userid: data.user.id,
			first_name: data.user.first_name,
			last_name: data.user.last_name,
			postcode: data.user.postcode,
			country: data.user.country,
			phone: data.user.phone,
			address1: data.user.address1,		
			countriesAll:countries	
        })
		}
		);
	}
  }
  handleChange(e) {
    this.setState({ first_name: e.target.value	});
  }
    handleChange1(e) {
    this.setState({ 
		last_name: e.target.value
			});
  }
    handleChange2(e) {
    this.setState({ 
		postcode: e.target.value	});
  }
    handleChange3(e) {
    this.setState({ 
		country: e.target.value	});
  }
  handleChange4(e) {
	this.setState({ 	
		phone: e.target.value
	});
  }
    handleChange5(e) {
    this.setState({ 
		address1: e.target.value	});
  } 
  
   componentWillUnmount() {
     clearTimeout(this.isLoading);
  }
  render() {
    const { postId,first_name,last_name,postcode,country,phone,address1,countriesAll } = this.state;
    const { CartItems } = this.state;
    const {loading} = this.state;
	 const { currentUser } = this.state;
    return (
<div className="container-fluid profile-main">  
 
	<div className="row profile-page">	
	<LeftSiderBar />
	{loading ? (<Loading/>)
      :(
	  
	<div className="col-md-10 profile-col profile-inner width_int" >
	{!currentUser ?
			<div className="col-md-10 orders-col orders-inner width_int" >
				For accessing this Page need to Login First
			</div>
			:
	<div className="user_profile_edt">
		<h2 className="profile-title">User Profile</h2> 
      <div className="chekout-inner Checkout_Form user_profile">       
        <form className='checkout_form_data ' onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input type="text" name="first_name" value={first_name} onChange={this.handleChange} />
           {this.validator.message("first_name", this.state.first_name, "required")}
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange1} />
            {this.validator.message("last_name", this.state.last_name, "required")}
          </div>
       
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange4}/>
           {this.validator.message("phone", this.state.phone, "required")}
          </div>
          <div className="form-group">
            <label className="form-label">Address1</label>
            <input type="text" name="address1" value={this.state.address1} onChange={this.handleChange5} />
           {this.validator.message("address1", this.state.address1, "required")}
          </div>
		 
          <div className="form-group">
            <label className="form-label">Country</label>
            <select className="country-select" onChange={this.handleChange3} value={this.state.country}>
            
              {(countriesAll || []).map((countryselect, idxx) =>
                <option value={countryselect.code} >{countryselect.name}</option>
              )}
            </select>
            {this.validator.message("country", this.state.country, "required")}
          </div>
        
          <div className="form-group">
            <label className="form-label">Postcode</label>
            <input type="text" name="postcode" value={this.state.postcode} onChange={this.handleChange2}/> 
           {this.validator.message("postcode", this.state.postcode, "required")}
          </div>
          
          <div className="mb-3 checkout_form_dv">
            <button className='btn btn-primary checkout_form_btn' type="submit">Update</button>
          </div>
		 { this.state.errorMessagesss &&
  <h3 className="success-message"> { this.state.errorMessagesss } </h3> }
        </form>
		
      </div>
	</div>}
	
      </div>
	  )}
      </div>
     
      </div>



    );
  }
}