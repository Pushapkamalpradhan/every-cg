import React, { useState, Component } from "react";
import axios from 'axios'
//import SimpleReactValidator from "simple-react-validator";
import LeftSiderBar from '../../../Component/SideBar/LeftSider/LeftSider'
import { useCookies } from "react-cookie";
import Cookies from 'universal-cookie';
import SimpleReactValidator from "simple-react-validator";
export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: null,
      value: 'PNG'
    };
    this.handleChange = this.handleChange.bind(this);
    //this.handlePrint = this.handlePrint.bind(this);
  }
  //let randomnumber =Math.random()

  validator = new SimpleReactValidator({
    messages: {
      email: "Please provide correct email @ address ",
      //   password:"hello",
      required: "This field is required",
    }

  });

  state = {
    email: "", first_name: "", last_name: "", address1: "", address2: "", country: "",
    phone: "", postcode: "", company: "", comment: "", sessionid: "", errorMessage: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    e.preventDefault();

    let email = this.state.email;
    let first_name = this.state.first_name;
    let last_name = this.state.last_name;
    let address1 = this.state.address1;
    let address2 = this.state.address1;
    let country = this.state.country;
    let phone = this.state.phone;
    let postcode = this.state.postcode;
    let company = this.state.company;
    let sessionid = this.state.sessionid;
    let comment = this.state.comment;

    if (localStorage.getItem("currentUser")) {
      if (this.validator.allValid()) {
        let tokend = JSON.parse(localStorage.getItem('currentUser')).token;
        //let token = localStorage.getItem('currentUser');
        console.log(tokend);


        const prod = JSON.stringify({
          email: email, first_name: first_name, last_name: last_name,
          address1: address1, address2: address2,
          country: country, phone: phone, postcode: postcode, company: company,
          comment: comment
        });
        const headers = {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${tokend}`
        };
        axios.post('https://dev.demo-swapithub.com/ecomm/api/order_create', prod, { headers })
          .then((response) => {

            if (response.status === 200) {
              const orderIds = response.data.order.orderID
              const ordertotal = response.data.total
              console.log('response', response.data.order.orderID);
              let cookiesset = localStorage.setItem('orderIds', JSON.stringify(orderIds));
              let tota = localStorage.setItem('totalorder', JSON.stringify(ordertotal));
              window.location = '/payment';

            }
          })
          .catch((error) => {
            if (error.response) {
              this.setState({ errorMessage: error.response.data.error })
              console.log(error.response.data.error);

            }
          });
      } else {
        this.validator.showMessages();
        // rerender to show messages for the first time
        // you can use the autoForceUpdate option to do this automatically`

        this.forceUpdate();
      }
    }

    else {
      if (this.validator.allValid()) {
        let cookiid = localStorage.getItem('cookieid');
        //let item = { firstname, password, email }
        const prod = JSON.stringify({
          email: email, first_name: first_name, last_name: last_name,
          address1: address1, address2: address2,
          country: country, phone: phone, postcode: postcode, company: company,
          sessionid: cookiid, comment: comment
        });
        const headers = {
          "Content-Type": 'application/json'
          // "Accept":'application/json'
        };
        axios.post('https://dev.demo-swapithub.com/ecomm/api/create_order', prod, { headers })
          .then((response) => {

            if (response.status === 200) {
              const orderIds = response.data.order.orderID
              const ordertotal = response.data.total
              console.log('response', response.data.order.orderID);
              let cookiesset = localStorage.setItem('orderIds', JSON.stringify(orderIds));
              let tota = localStorage.setItem('totalorder', JSON.stringify(ordertotal));
              window.location = '/payment';

            }
          }).catch((error) => {
            if (error.response) {
              this.setState({ errorMessage: error.response.data.error })
              console.log(error.response.data.error);

            }
          });
      } else {
        this.validator.showMessages();
        // rerender to show messages for the first time
        // you can use the autoForceUpdate option to do this automatically`

        this.forceUpdate();
      }


    }

  };

  componentDidMount() {
    axios.get('https://dev.demo-swapithub.com/ecomm/api/countries')
      .then(response => this.setState({ CartItems: response.data }));
  }
  handleChange(e) {
    this.setState({ country: e.target.value });
  }
  render() {
    const { postId } = this.state;
    const { CartItems } = this.state;
    console.log('', CartItems);
    return (
      <div className="chekout-inner Checkout_Form">
        {/* <h2>Checkout Form</h2> */}
        <form className='checkout_form_data ' onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input type="text" name="first_name" value={this.state.first_name} onChange={e => this.setState({ first_name: e.target.value })} />
            {this.validator.message("first_name", this.state.first_name, "required")}
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input type="text" name="last_name" value={this.state.last_name} onChange={e => this.setState({ last_name: e.target.value })} />
            {this.validator.message("last_name", this.state.last_name, "required")}
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="text" name="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
            {this.validator.message("email", this.state.email, "required|email")}
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input type="text" name="phone" value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
            {this.validator.message("phone", this.state.phone, "required")}
          </div>
          <div className="form-group">
            <label className="form-label">Address1</label>
            <input type="text" name="address1" value={this.state.address1} onChange={e => this.setState({ address1: e.target.value })} />
            {this.validator.message("address1", this.state.address1, "required")}
          </div>
          <div className="form-group">
            <label className="form-label">Address2</label>
            <input type="text" name="address2" value={this.state.address2} onChange={e => this.setState({ address2: e.target.value })} />
            {this.validator.message("address2", this.state.address2, "required")}
          </div>
          <div className="form-group">
            <label className="form-label">Country</label>
            <select className="country-select" onChange={this.handleChange}>
              <option>Select Country</option>
              {(CartItems || []).map((datass, idxx) =>
                <option value={datass.code} >{datass.name}</option>
              )}
            </select>
            {this.validator.message("country", this.state.country, "required")}
          </div>
          <div className="form-group">
            <label className="form-label">Postcode</label>
            <input type="text" name="postcode" value={this.state.postcode} onChange={e => this.setState({ postcode: e.target.value })} />
            {this.validator.message("postcode", this.state.postcode, "required")}
          </div>
          <div className="form-group">
            <label className="form-label">Company</label>
            <input type="text" name="company" value={this.state.company} onChange={e => this.setState({ company: e.target.value })} />
            {this.validator.message("company", this.state.company, "required")}
          </div>


          <div className="form-group checkout_form_dv">
            <label className="form-label">Note</label>
            <textarea type="textarea" name="comment" value={this.state.comment} onChange={e => this.setState({ comment: e.target.value })} />
          </div>
          <div className="mb-3 checkout_form_dv">
            <button className='btn btn-primary checkout_form_btn' type="submit">Submit</button>
          </div>

        </form>
      </div>



    );
  }
}