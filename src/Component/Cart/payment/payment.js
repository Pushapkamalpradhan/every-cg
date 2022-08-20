import React, { useState, Component } from "react";
import axios from 'axios'
import LeftSiderBar from '../../../Component/SideBar/LeftSider/LeftSider'
import { useCookies } from "react-cookie";
import Cookies from 'universal-cookie';
import SimpleReactValidator from "simple-react-validator";

export default class Payment extends Component {
constructor(props) {
    super(props);

    this.state = {
      postId: null,
      errorMessage: '',
      setErrorMessage: '',
	  isDisabled: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
  }
  //let randomnumber =Math.random()
  validator = new SimpleReactValidator({
    messages: {
      // email: "Please provide correct email @ address ",
      //   password:"hello",
      required: "This field is required",
    }

  });


  state = { card_number: "", exp_month: "", exp_year: "", cvc: "", amount: "", errorMessage: '' };

  StripePaymeny = e => {


    e.preventDefault();

    e.preventDefault();
    let card_number = this.state.card_number;
    let exp_month = this.state.exp_month;
    let exp_year = this.state.exp_year;
    let cvc = this.state.cvc;
    let amount = this.state.amount;



    let totalorder = localStorage.getItem('totalorder');
    console.log(totalorder);
    //let item = { firstname, password, email }
    if (this.validator.allValid()) {
      const paymentdata = JSON.stringify({
        card_number: card_number, exp_month: exp_month, exp_year: exp_year,
        cvc: cvc, amount: totalorder
      });
      const headers = {
        "Content-Type": 'application/json'
        // "Accept":'application/json'
      };
      axios.post('https://dev.demo-swapithub.com/ecomm/api/stripe', paymentdata, { headers })
        .then((response) => {

          if (response.status === 200) {
			  
			    if (localStorage.getItem("currentUser")) {
					
            console.log('success');
            let orderId = localStorage.getItem('orderIds');
            console.log('orderIds', orderId);
            const idorder = JSON.stringify({ orderid: orderId });
			let tokend = JSON.parse(localStorage.getItem('currentUser')).token;
			//console.log('tokend',tokend)
            const headers = {
              "Content-Type": 'application/json',
			   "Authorization": `Bearer ${tokend}`
            };
            axios.post('https://dev.demo-swapithub.com/ecomm/api/order_complete', idorder, { headers })
              .then((response) => {
                if (response.status === 200) {
                  console.log('orderId done');
                  window.location = '/thankyou';
                }
              });



				} 
				else {
			
            let orderId = localStorage.getItem('orderIds');
            let cookieid = localStorage.getItem('cookieid');
            console.log('orderIds', orderId);
            const idorder = JSON.stringify({ orderid: orderId,sessionid: cookieid});
			
            const headers = {
              "Content-Type": 'application/json'
			  
            };
            axios.post('https://dev.demo-swapithub.com/ecomm/api/complete_order', idorder, { headers })
              .then((response) => {
                if (response.status === 200) {
                  console.log('orderId done');
                  window.location = '/thankyou';
                }
              });
					
				}

            //////   
          }
          else {
            alert('your detail is wrong')
          }
        }).catch((error) => {
          if (error.response) {
            this.setState({ errorMessage: error.response.status })
            console.log(error.response.status);

          }
        });
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`

      this.forceUpdate();
    }


  };
  //
  componentDidMount() {
    axios.get('https://dev.demo-swapithub.com/ecomm/api/month_year')
      .then(response => this.setState({ monthValue: response.data.months, yearValue: response.data.years, }));
  }
  handleChange(e) {
    this.setState({ exp_year: e.target.value });
  }
  handleChange1(e) {
    this.setState({ exp_month: e.target.value });
  }
  /*   handleChange1(e) {
      this.setState({ );
    } */

handleSubmitClicked() {
	if(!this.state.errorMessage === 500) {
	setTimeout(()=>{
		
    this.setState({
      isDisabled: true
    })
		
	}, 1000)

    setTimeout(
      function() {
        this.enableComponents()
      }.bind(this),
      50000
    );
	}
  }
  enableComponents() {
	  if(!this.state.errorMessage === 500) {
    this.setState({
      isDisabled: false
    });
	  }
  }
  onKeyPressEvent = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!(new RegExp("[0-9]").test(keyValue)))
      event.preventDefault();
    return;
  }
  render() {
    const { postId } = this.state;
    const { monthValue, yearValue } = this.state;
    console.log(yearValue, monthValue);
    return (
      <div className="container-fluid stripe-form">
       
          <div className="row stripe-page">

            <LeftSiderBar />
            <div className="col-md-10 cart-col cart-stripe-inner" >
              <div className="stripe-inner">
          
                <form className='stripe_from ' onSubmit={this.StripePaymeny}>
                <h2>Payment Information</h2>
                  {/* <div className="mb-3 form-group">
                    <label className="form-label">Card Number</label>
                    <input type="text" name="card_number" value={this.state.card_number} onChange={e => this.setState({ card_number: e.target.value })} />
                    {this.validator.message("card_number", this.state.card_number, "required")}
                  </div> */}
				 
                  <div className="mb-3 form-group Card_Number">
                    <label className="form-label ">Card Number</label>
                    <input type="text" name="card_number" value={this.state.card_number} onChange={e => this.setState({ card_number: e.target.value })}
                     minlength="0"
                     maxlength="16"
                     disabled={this.state.isDisabled} onKeyPress={this.onKeyPressEvent}/>
                    <span class="input-group-addon"><i class="fa fa-credit-card"></i></span>
                    {this.validator.message("card_number", this.state.card_number, "required")}
                  </div>
                  <div className="month_Year">
                    <div className="card_name">
                      <label className="form-label">Month</label> / <label className="form-label">Year</label>
                    </div>
                    <div className="mb-3 form-group">
                      <span className="_month">
                        <select className="month-select" onChange={this.handleChange1}>
                          {/* <option>Select Month</option> */}
						  <option value="" >MM</option>
                          {(monthValue || []).map((monthData, idxx) =>
                            <option value={monthData.month} >{monthData.month}</option>
                          )}
                        </select> / 
                       
                      </span>
                      <span className="_yesr">
                        {/* <label className="form-label">Year</label> */}
                        <select className="year-select" onChange={this.handleChange}>
                          {/* <option>Select Year</option> */}
						   <option value="" >YYYY</option>
                          {(yearValue || []).map((yearData, idxx) =>
                            <option value={yearData.year} >{yearData.year}</option>
                          )}
                        </select> 
                        {this.validator.message("exp_year", this.state.exp_year, "required")}
                      </span>

                    </div>
                  </div>
                  <div className="mb-3  cvc_cvv">
                    <label className="form-label">CVC</label>
                    <input type="text" name="cvc"
                    minlength="1"
                    maxlength="4"
                     value={this.state.cvc} onChange={e => this.setState({ cvc: e.target.value })} disabled={this.state.isDisabled} onKeyPress={this.onKeyPressEvent}/>
                    {this.validator.message("cvc", this.state.cvc, "required")}
                  </div>
                  <div className="submit_cart">
                    <button className='btn btn-primary w-100' type="submit" disabled={this.state.isDisabled}
          onClick={this.handleSubmitClicked.bind(this)}>Submit</button>
                  </div>
				  
                </form>
				{this.state.errorMessage && <p className="invalid-detail">Invalid Payment Information</p>}
              </div>
            </div>
          </div>
        
      </div>



    );
  }
}