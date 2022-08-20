import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";

export default class BannerSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: null,
        }
      }
      next = () => {
        this.setState((state) => ({
            currentSlide: state.currentSlide + 0,
        }));
    };

    prev = () => {
        this.setState((state) => ({
            currentSlide: state.currentSlide - 0,
        }));
    };
      componentDidMount() {
        fetch('https://dev.demo-swapithub.com/ecomm/api/slider').then((Response) => {
          Response.json().then((result) => {
            //console.log(result)
            this.setState({ users: result })
          })
        })
      }
    
    render() {
        return (
            <Carousel autoPlay={true}
        showArrows={false}
        infiniteLoop={true}
        interval={10000}
        stopOnHover={false}
        showThumbs={false}
        showStatus={false}
        showIndicators={true}>
                {
            this.state.users ?
              this.state.users.map((slider,index// , current_page
              ) =>
                // <div className={index===0 ?"carousel-item active": "carousel-item"}>
                <div >
                  {/* <img src={BannseImg} className="d-block w-100" alt="..." /> */}
                  <img src={'https://dev.demo-swapithub.com/ecomm/' + slider.image} alt={slider.name} />
                  <div className="carousel-caption home_slider">
                    <p className="text-muted" numberOfLines={2} ellipsizeMode='end' dangerouslySetInnerHTML={{ __html: slider.html }} >
					 
					
					</p>
					<div className="shop-slider" ><a href="#">{slider.url_text}</a></div>
                    
                    {/* <Link className="shop_new_home_sld">SHOP NOW</Link> 
                      <h5>ARCHINTERIORS VOL.57 FOR BLENDER 1</h5>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. 1</p> */}
                  </div>
                </div>
                    )
                    :
                    null
                }
            </Carousel>
        );
    }
};
// export default BannerSlider;
// ReactDOM.render(<BannerSlider />, document.querySelector('.demo-carousel'));