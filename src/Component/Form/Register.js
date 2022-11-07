import React, { useState, Component } from "react";
import axios from 'axios'
import SimpleReactValidator from "simple-react-validator";
import logoimage from '../../images/logo-forms.png';
import bgimage from '../../images/background-.jpg';
import LeftSiderBar from '../SideBar/LeftSider/LeftSider'
export default class RegisterTest extends Component {

    state = { email: "", first_name: "", password: "", errorMessage: '' };

    validator = new SimpleReactValidator({
        messages: {
            email: "Please provide correct email @ address ",
            //   password:"hello",
            required: "This field is required",
        }

    });

    handleSubmit = e => {
        e.preventDefault();
        // const errorDiv = error 
        // ? <div className="error">
        //     <i class="material-icons error-icon">error_outline</i>
        //     {error}
        //   </div> 
        // : '';
        // setError(null);
        if (this.validator.allValid()) {
            let email = this.state.email;
            let password = this.state.password;
            let first_name = this.state.first_name;
            //let item = { firstname, password, email }
            const prod = JSON.stringify({ email: email, password: password, first_name: first_name });
            const headers = {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            };

            axios.post('https://dev.demo-swapithub.com/ecomm/api/register', prod, { headers })
                .then((response) => {
					
					if (response.status === 200) {
						localStorage.setItem('currentUser', JSON.stringify(response.data.success));
						window.location = '/thank-you';
						window.location = '/';
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
    };

    render() {
        return (
            <div className="App">
                <div className="main-register main-forms container-fluid">
                    <div className="row register-row">
                        <LeftSiderBar />
                        <div className="col-md-10 register-col width_int" >
                            <div className="background-image-form" style={{ background: `url(${bgimage})`, }}>
                                <div className='form-common-main register-inner'>
                                    <div className='register-logo'>
                                        <img src={logoimage} />
                                    </div>
                                    <div className='form-common-main_data'>
                                        <h2>Register</h2>
                                        <form className='Register_from ' onSubmit={this.handleSubmit}>
                                            <div className="mb-3 form-group">
                                                <label className="form-label">Name</label>
                                                <input type="text" name="first_name" value={this.state.first_name} placeholder="Name"  onChange={e => this.setState({ first_name: e.target.value })} />
                                                {this.validator.message("first_name", this.state.first_name, "required")}
                                            </div>
                                            <div className="mb-3 form-group">
                                                <label className="form-label">Email address</label>
                                                <input type="email" className="form-control" id="email" placeholder="Email" required="" name="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                                {this.validator.message("email", this.state.email, "required|email")}
                                            </div>
                                            {this.state.errorMessage &&
                                                <p className="error srv-validation-message"> {this.state.errorMessage} </p>}
                                            <div className="mb-3 form-group">
                                                <label className="form-label">Password</label>
                                                <input type="password" value={this.state.password} placeholder="password" onChange={e => this.setState({ password: e.target.value })} />
                                                {this.validator.message("password", this.state.password, "required|password")}
                                            </div>
                                            <button className='btn btn-primary' type="submit">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


