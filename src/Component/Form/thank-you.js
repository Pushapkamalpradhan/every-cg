import React, { useState, Component } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
//import SimpleReactValidator from "simple-react-validator";
import LeftSiderBar from '../SideBar/LeftSider/LeftSider'
import { useCookies } from "react-cookie";
import Cookies from 'universal-cookie';



export default class Thankyouregister extends Component {
  constructor() {
    super();
    this.state = {
      users: null
    }

  }

  componentDidMount() {

  }

  render() {
    
    return (
      <div className="container-fluid thankyou-register thankyou-page ">
        <div className="row thankyou-row">
          <div className="row thankyou-page">
            <LeftSiderBar />
            <div className="col-md-10 thankyou-col thankyou-inner" >
            <table className="thank_you" >
                
                <tbody>
                  <tr>
                    <td>
                   
                      <h3 className="thank_you_title" >Thank you for the Registration!</h3>
                      <p className="thank_you_inf mt-4">You have successfully registered, Please login with your details</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="pad" >
                      
                      <div className="backto-home-btn mt-5">
                         <Link to="/login">Login Here</Link>
                      </div>
                       
                     
                    </td>
                  </tr>               
                
           
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}