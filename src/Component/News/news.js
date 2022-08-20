import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import topInformationimg from '../../images/bg1.jpg'
import categorybanner from '../../images/category-banner.jpg'
import LeftSiderBar from '../SideBar/LeftSider/LeftSider'
import ReactPaginate from 'react-paginate';
import loder from '../../images/loader-orange.gif'
import Loader from 'react-loader-spinner';

const Loading = () =>
<div className="col-md-10 position-relative loder_imag">
	<img src={loder} />
</div>
class News extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            offset: 0,
            newsdata: [],
            orgnewsdata: [],
            perPage: 3,
            currentPage: 0,
            loading: true,
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
        const data = this.state.orgnewsdata;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            newsdata: slice
        })
    }
    componentDidMount() {
        this.isLoading = setTimeout(() => { this.setState({ loading: false }) }, 2300);
		Promise.all([
		fetch('https://dev.demo-swapithub.com/ecomm/api/news'),
		fetch('https://dev.demo-swapithub.com/ecomm/api/get-page/news')
		])
		.then(([newsinfo,newsbanner]) =>Promise.all([newsinfo.json(),newsbanner.json()]))
		.then(([newsall,newsbannerdata]) => {
		var data = newsall;
		var pageContent = newsbannerdata.content
		var pagetitle = newsbannerdata.title
		var pageImage = newsbannerdata.image
		
		
        
                var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    orgnewsdata: newsall,
                    newsdata: slice,
					
			/*News banner section*/		
			pagedes :pageContent,
			 pageTitle : pagetitle,
			 pageimage :pageImage
                })
            });
        
    }
    timer = () => setTimeout(() => {
		this.setState({ loading: false })
	}, 2300);
    render() {
       const { data2,pageTitle,pageimage,loading } = this.state;
        return (
            <div className="row  m-0 news-main" >
                <LeftSiderBar />
                <div className='col-md-10 width_int news-col'>
                    {/*<div className='topInformationimg'>
                        <img src={topInformationimg} />
                        <h2>All News</h2>
                    </div> */}
                    {loading ? (<Loading />)
					: (
					<div className="loader-div">
                    <div className="row news-inner">
                    <div className='banner-sect-category'  style={{background: `url(${'https://dev.demo-swapithub.com/ecomm'+ pageimage})`,}}>
                        <div className="breadcrumb"><Link to="/" >Home </Link> <span> <i class="fa fa-angle-right"></i> </span> {pageTitle}</div>
                        <h2 className="cat-title">{pageTitle}</h2>
						<p className="content-category">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
                    </div>
                        {
                            this.state.newsdata ?
                                this.state.newsdata.map((item
                                    // , current_page
                                ) =>
                                    <div className="col-md-6 col-lg-4 col-xl-12 mt-3 news-listing">
                                        <div className="text-black row">
                                        <div className='col-md-12 col-xl-4 news-image-sect' key={item._id}>                                                {/* <Link to={'/ProductShop/' + item.alias} className='Shop_now_page'> */}
                                                <img src={'https://dev.demo-swapithub.com/ecomm/' + item.image} alt={item.name} />
                                                {/* </Link> */}
                                            </div>
                                            <div className="col-sm-12 col-xl-8 news-body">
                                                <div className="text-center">
                                                    <h5 className="card-title news-title">{item.title}</h5>
                                                    <div className='date_time'>
                                                        <p><i class="fa fa-calendar"></i>{item.date}</p>
                                                        <p><i class="fa fa-clock-o"></i>{item.time}</p>
                                                    </div>
                                                    <p className="text-mutted"
                                                        numberOfLines={2} ellipsizeMode='end'
                                                        dangerouslySetInnerHTML={{ __html: item.content }} ></p>
														<div className='read-morenews'>
                                                    <Link to={`/newsdetail/${item.alias}`} className='read-more'>Read More</Link>
                                            </div>
                                                </div>
                                               
                                            </div>
											
                                        </div>
                                    </div>
                                )
                                :
                                null
                        }
                    </div>
                    <ReactPaginate
                    previousLabel={<i class="fa fa-angle-left"></i>}
                    nextLabel={<i class="fa fa-angle-right"></i>}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
                </div>
                
                    )}
                </div>
            </div>
        )
    }
}

export default News;
