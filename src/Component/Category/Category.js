import React from 'react'
import { withRouter,Link } from 'react-router-dom';
import LeftSiderBar from '../SideBar/LeftSider/LeftSider'
import categorybanner from '../../images/category-banner.jpg'
import ReactPaginate from 'react-paginate';
import loder from '../../images/loader-orange.gif'
import Loader from 'react-loader-spinner';

const Loading = () =>
<div className="col-md-10 position-relative loder_imag">
	<img src={loder} />
</div>
class Category extends React.Component {
    constructor() {
        super();
        this.state = {
            categorydata: null,
			offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 8,
            currentPage: 0,
			books: [],
			allTimeInfo:null,
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
	componentDidMount(){
        this.isLoading = setTimeout(() => { this.setState({ loading: false }) }, 2300);
        Promise.all([
            fetch('https://dev.demo-swapithub.com/ecomm/api/categories/'),
            fetch('https://dev.demo-swapithub.com/ecomm/api/get-page/category')
        ])
        .then(([res, res2]) => Promise.all([res.json(), res2.json()]))
		.then(([data1, data2]) => {
		var data = data1;
		var pageContent = data2.content
		var pagetitle = data2.title
		var pageImage = data2.image
		//console.log('pageConten',pageContent);
		var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			 pageCount: Math.ceil(data.length / this.state.perPage),
             orgtableData: data1,
             tableData: slice,
            
			
             data2 :pageContent,
			 pageTitle : pagetitle,
			 pageimage :pageImage
        })
		}
		);
    }	
    goToCategory = (item) => {
        const { history } = this.props;
        history.push(`/categorypage/${item.alias}`, { catId: item.id, catname: item.name})
		//history.push({ catname: item.name })
    }
	
	timer = () => setTimeout(() => {
		this.setState({ loading: false })
	}, 2300);
    render() {
		const { data2,pageTitle,pageimage,loading } = this.state;
		return (
            <div className="category-main row m-0 p-0 ">
                <LeftSiderBar />
                <div className="col-md-10 width_int category-col"> 
                 {loading ? (<Loading />)
					: (
					<div className="loader-div">
                    <div className='banner-sect-category' style={{background: `url(${'https://dev.demo-swapithub.com/ecomm'+ pageimage})`,}}>
                        <div className="breadcrumb"><Link to="/" >Home </Link> <span> <i class="fa fa-angle-right"></i></span> {pageTitle}</div>
                        <h2 className="cat-title">{pageTitle}</h2>
						<p className="content-category" 
                         dangerouslySetInnerHTML={{ __html: data2 }}></p>
                    </div>
                   
                    <div className="row category px-2">
                        {
                            this.state.tableData ?
                                this.state.tableData.map((item
                                    // , current_page
                                ) =>
                                    <div className="col-6 col-md-4 col-xl-3 mt-3 category-listing">
                                        <div className="category-shop">
										{/*  <button onClick={() => this.goToCategory(item)}> */}
										 <Link to={`categorypage/${item.alias}`}> 
                                            <div className="card text-black featured_Products">
											     <div className="card-body">
                                                    <div className="text-center">
                                                        <h5 className="card-title">{item.name}</h5>
                                                    </div>
                                                </div>
                                                <div className='featured_Products_image'>
                                                    <img src={'https://dev.demo-swapithub.com/ecomm/' + item.image} alt={item.name} />
                                                    
                                                </div>
                                                </div></Link>
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
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
                </div>
				
                    )}</div>
            </div>
            
        );
    }
}
export default withRouter(Category);
