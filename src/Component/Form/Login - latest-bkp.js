import React, { useState, useEffect } from "react";
import { setUserSession } from './Common';
import axios from 'axios';

import { useHistory,useParams } from "react-router-dom";
import Header from '../Header'

function Login(props){



  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('https://dev.demo-swapithub.com/ecomm/api/login', { email: email.value, password: password.value }).
    then(response => {
      //console.log("token: ", response.data.token);
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      localStorage.setItem('token', response.data.token)
     let token = localStorage.getItem('token')
      console.log(token);
      props.history.push('/ProductCategory');
    })
    .catch(error => {
      setLoading(false);
     // if (error.response.status === 401) setError(error.response.data.message);
     // else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div className="form-common-main">
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...email} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
     
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;