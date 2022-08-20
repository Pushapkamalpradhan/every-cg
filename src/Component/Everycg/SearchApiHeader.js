import React from 'react';
export default class searchFrom extends React.Component {
  constructor(props) {
    super(props);
	this.handleChange = this.handleChange.bind(this);
  }
handleChange(e) {
    this.setState({ keyword: e.target.value	});
	localStorage.setItem("searchValue", e.target.value);
} 
  
  render() {
	 const searchvalue = localStorage.getItem("searchValue");
	 //const slugvalue = window.location.href.split('?keyword=')[1];
	 console.log('valuesearchs',searchvalue);
    return (
        <div className='search_form_mant'>
        <form className='search_form' action="/search" method="GET">
          <input type="text" name="keyword"  value={searchvalue} placeholder='Search' onChange={this.handleChange} />
          <button className="btn search_name" type="submit"><i className="fa fa-search"></i></button>
        </form>
      </div>
    );
  }
}