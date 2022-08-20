import React from 'react'
import { Link } from 'react-router-dom';
import topInformationimg from '../../../images/bg1.jpg'
import LeftSiderBar from '../../SideBar/LeftSider/LeftSider'
import categorybanner from '../../../images/category-banner.jpg'
import ReactPaginate from 'react-paginate';
import loder from '../../../images/loader-orange.gif'
import Loader from 'react-loader-spinner';

const Loading = () =>
<div className="col-md-10 position-relative loder_imag">
	<img src={loder} />

</div>
class featuredProducts extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
			offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 8,
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
        const data = this.state.orgtableData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            tableData: slice
        })
    }
	
    componentDidMount() {
		 this.isLoading = setTimeout(() => { this.setState({ loading: false }) }, 2300);
		
        fetch('https://dev.demo-swapithub.com/ecomm/api/products').then((Response) => {
            Response.json().then((result) => {
                //console.warn(result.data)
                //this.setState({ users: result.data })
				
				var data = result.data;
                var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    orgtableData: result.data,
                    tableData: slice
                })
            })
        })
    }
	
    timer = () => setTimeout(() => {
		this.setState({ loading: false })
	}, 2300);
	
    render() {
		const { loading } = this.state;
        return (

            <div className="row m-0 p-0 shop-page">
                <LeftSiderBar />
                <div className="col-md-10 width_int">
					{loading ? (<Loading />)
					: (
					<div className="loader-div">
                    <div className='banner-sect-category' style={{ background: `url(${categorybanner})`, }}>
                        <div className="breadcrumb"><Link to="/" >Home </Link> <span> <i class="fa fa-angle-right"></i> </span> Products</div>
                        <h2 className="cat-title">All Products</h2>
                        <p className="content-category">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
                    </div>
                    <div className="row ">
                        {
                        this.state.tableData.map((item) => (
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                                        <div className="com_cover_div">
                                              {item.stock === 0 ? (
                                                        <div className="card text-black featured_Products out_of_stock">
                                                            <div className='featured_Products_image'>
                                                                <img src={'https://dev.demo-swapithub.com/ecomm/' + item.image} alt={item.name} />
                                                                <div className='Shop_now'>
                                                                    <Link className='Shop_now_page'>Out of Stock </Link>
                                                                </div>
                                                            </div>
                                                            <div className='shop_price'>
                                                                <span >${item.price}</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="card text-black featured_Products">
                                                            <div className='featured_Products_image'>
                                                                <img src={'https://dev.demo-swapithub.com/ecomm/' + item.image} alt={item.name} />
                                                                <div className='Shop_now'>
                                                                    <Link to={`/newproductshop/${item.alias}`} className='Shop_now_page'>Shop Now </Link>
                                                                </div>
                                                            </div>
                                                            <div className='shop_price'>
                                                                <span >${item.price}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <p className="text-muted"
                                                        numberOfLines={2} ellipsizeMode='end'
                                                        dangerouslySetInnerHTML={{ __html: item.content }} ></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                    </div>
					<ReactPaginate
                            previousLabel={<i class="fa fa-angle-left"></i>}
                            nextLabel={<i class="fa fa-angle-right"></i>}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
							</div>
							)}
                </div>
            </div>
        );
    }
}
export default featuredProducts;