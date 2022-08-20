import React from 'react';
class productDetailNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    }
  }
  componentDidMount() {
    fetch(`https://everycg.com/administrator/api/category-products/${3}`).then((Response) => {
      Response.json().then((result) => {
        console.log(result)
        this.setState({ users: result })
      })
    })
  }

  render() {
    return (
      <div className="container-fluid" >
        <div className="row">
          {
            this.state.users ?
              this.state.users.map((slider) =>
                <div className="col-md-3">
                  <img src={'https://everycg.com/administrator/' + slider.image} alt={slider.name} />
                </div>
              )
              :
              null
          }
        </div>

      
      </div>
    );
  }
}
export default productDetailNew;