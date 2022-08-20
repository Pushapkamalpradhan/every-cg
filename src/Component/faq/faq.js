import React from "react";
import LeftSiderBar from "../SideBar/LeftSider/LeftSider";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import loder from '../../images/loader-orange.gif'
import Loader from 'react-loader-spinner';
const Loading = () =>
    <div className="position-relative loder_imag ">
        <img src={loder} />
    </div>
class FAQ extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            loading: true,
        }
    };
    componentDidMount() {
        this.isLoading = setTimeout(() => { this.setState({ loading: false }) }, 2300);
        Promise.all([
            fetch('https://dev.demo-swapithub.com/ecomm/api/faq'),
            fetch('https://dev.demo-swapithub.com/ecomm/api/get-page/faq')
        ])
            .then(([faqinfo, faqbanner]) => Promise.all([faqinfo.json(), faqbanner.json()]))
            .then(([faqinfoall, faqbannerdata]) => {
                var pageContent = faqbannerdata.content;
                var pagetitle = faqbannerdata.title;
                var pageimage = faqbannerdata.image;
                var pagecontent = faqbannerdata.content;
                this.setState({
                    faqdata: faqinfoall,
                    pagedes: pageContent,
                    pageTitle: pagetitle,
                    pageimage: pageimage,
                    pagecontent: pagecontent
                });
            })
    }
    timer = () => setTimeout(() => {
        this.setState({ loading: false })
    }, 2300);
    render() {
        const { pageTitle, pageimage, pagecontent, loading } = this.state;
        return (
             <>
             {loading ? (<Loading />)
             : (
            <div className="row  m-0 ">
                
                           
                <LeftSiderBar />
                <div className='col-md-10 width_int'>
                   
                            <div className="loader-div">
                                <div className="row news-inner">
                                    <div className='banner-sect-category' style={{ background: `url(${'https://dev.demo-swapithub.com/ecomm' + pageimage})`, }}>
                                        <div className="breadcrumb"><Link to="/" >Home </Link> <span> <i className="fa fa-angle-right"></i> </span> {pageTitle}</div>
                                        <h2 className="cat-title">{pageTitle}</h2>
                                        <p className="content-category">{pagecontent}</p>
                                    </div>
                                    <div className="faq">
                                        {/* <h2>FAQ's</h2> */}
                                        <div className="accordion" id="accordionExample">
                                            {
                                                this.state.faqdata ?
                                                    this.state.faqdata.map((item
                                                        // , current_page
                                                    ) =>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingTwo">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#" + item.alias} aria-expanded="false" aria-controls={item.alias}>
                                                                    {item.alias + '?'}
                                                                </button>
                                                            </h2>
                                                            <div id={item.alias} className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    luctus nunc. Fusce in arcu quis lacus mollis ultrices.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    :
                                                    null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                </div>
               
            </div>
          
           )}
            </>
        )
    }
}
export default FAQ;
