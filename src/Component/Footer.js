import React  from "react";
import logo from '../images/logo.png'
import call from '../images/call.png'
import map from '../images/map.png'
import timeSet from '../images/timeSet.png'
import { Link } from 'react-router-dom';
import { authenticationService } from '../Component/Form/_services';
import loder from '../../src/images/loader-orange.gif'
import Loader from 'react-loader-spinner';

const Loading = () =>
    <div className="col-md-10 position-relative loder_imag">
        <img src={loder} />

    </div>
class Footer extends React.Component {
//export default function Footer(){

	constructor() {
    super();
    this.state = {
      currentUser: null,
	  loading: true,
    };
  }
    componentDidMount() { 
		this.isLoading = setTimeout(() => { this.setState({ loading: false }) }, 2300);
	 authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x,
    })); 
	Promise.all([
	fetch('https://dev.demo-swapithub.com/ecomm/api/widget/second-footer'),
	fetch('https://dev.demo-swapithub.com/ecomm/api/widget/third-footer'),
	fetch('https://dev.demo-swapithub.com/ecomm/api/widget/fourth-footer'),
	fetch('https://dev.demo-swapithub.com/ecomm/api/widget/fifth-footer'),
	fetch('https://dev.demo-swapithub.com/ecomm/api/site-info'),
	
	]).
	then(([widget2,widget3,widget4,widget5,site_info]) => Promise.all([widget2.json(),widget3.json(),widget4.json(),widget5.json(),site_info.json()]))
	.then(([widget_2,widget_3,widget_4,widget_5,site_infor]) =>{
		this.setState({ 
			description :widget_2.description,
			widget3_desc : widget_3.description,
			widget4_desc : widget_4.description,
			footer_logo : site_infor.logo,
			footer_phone : site_infor.phone,
			footer_address : site_infor.address,
			footer_time : site_infor.time_active,
			footer_copyright : site_infor.copyright,
			
		})
		
	})
	}
    timer = () => setTimeout(() => {
        this.setState({ loading: false })
    }, 2300);
render() { 
	   const { currentUser,description,widget3_desc,widget4_desc,site_info1,loading } = this.state;
 
		if(localStorage.getItem("currentUser")) {	
			 let tokend = JSON.parse(localStorage.getItem('currentUser')).token;
			 //console.log('asda',site_info1);
		}
	    return(    
			
                <div className="row m-0 footer">
                    <div className="col-md-2 contact_dt">
                    <Link className="footer_logo " to="/" >

					<img src={this.state.footer_logo} alt={this.state.footer_logo} /></Link>
                    <ul>
                        <li><a className="footer_atn hover" href={'tel:' + this.state.footer_phone}><img src={call}  alt="dsf" /> <span>{this.state.footer_phone}</span></a></li>
                        <li><Link className="footer_atn hover" to='/'><img src={map}  alt="dsf" /> <span>{this.state.footer_address} </span></Link></li>
                        <li><Link className="footer_atn hover" to='/'><img src={timeSet}  alt="dsf" /><span>{this.state.footer_time}</span></Link></li>
                    </ul>
                    </div>
                    <div className="col-md-2 shop_ul"> 					
						<div dangerouslySetInnerHTML={{ __html: description }} />                       
                   </div>
                    <div className="col-md-3 why_brand">
                        <div dangerouslySetInnerHTML={{ __html: widget3_desc }} />  
                    </div>
                    <div className="col-md-3 support">
						<h4>SUPPORT</h4>
                        <p>If you have any questions regarding our products or services<Link to='/contact'> Just ask us</Link>  <i className="fa fa-angle-right"></i> Read here <Link to='/faq'>Frequently Asked Questions.</Link></p>
						{/* <div dangerouslySetInnerHTML={{ __html: widget4_desc }} />  */ }
                    </div>
                    <div className="col-md-2 user_area">
                        <h4>USER AREA</h4>
                        <ul>
						{!currentUser &&
							<li><Link className="footer_atn hover" to='/login'>Your orders</Link></li>
						}				
						{currentUser &&
							<li><Link className="footer_atn hover" to='/orders'>Your orders</Link></li>
						}
						{!currentUser &&
                            <li><Link className="footer_atn hover" to='/login'>Your profile</Link></li>
						}
						{currentUser &&
                            <li><Link className="footer_atn hover" to='/userprofile'>Your profile</Link></li>
						}
                        </ul>
                    </div>
                    <div className="copyRighrt">
                        <hr />
                        <p>{this.state.footer_copyright}</p>
                    </div>
                </div>
				
       
    )
}
}
export default Footer;


