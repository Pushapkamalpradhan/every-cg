import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Workdmap from '../../images/workd-map.png'
import categorybanner from '../../images/category-banner.jpg'
import LeftSiderBar from '../SideBar/LeftSider/LeftSider'
function ContactForm() {

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [content, setContent] = useState("");
    const [Message, setMessage] = useState("");
    let allfileds = { name, title, email, phone, content }
    let contactSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("https://dev.demo-swapithub.com/ecomm/api/contact", {
                method: 'POST',
                body: JSON.stringify(allfileds),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });
            if (res.status === 200) {
                setName("");
                setTitle("");
                setEmail("");
                setPhone("");
                setContent("");
                setMessage("Thanks for contacting us! We will be in touch with you shortly.");
            } else {
                setMessage("Please Fill All The Fields");
            }


        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="main-contact-us main-forms container-fluid">
            <div className="row contact-row">
                <LeftSiderBar />
                <div className="col-md-10 contact-col width_int" >
                    <div className='banner-sect-category' style={{ background: `url(${categorybanner})`, }}>
                        <div className="breadcrumb"><Link to="/" >Home </Link> <span> <i class="fa fa-angle-right"></i> </span> Contact Form</div>
                        <h2 className="cat-title"> Contact Form</h2>
                        <p className="content-category">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
                    </div>
                    {/* <div className="background-image-form"  style={{background: `url(${Workdmap})`,}}> */}

                    <div className='main-contact-inner form-common-main form-common-main_data' style={{ background: `url(${Workdmap})`, }}>

                        {/* <div className='contact-logo'>
               <img src={logoimage} /> 
             
              </div> */}
                        <h2 className="contact-title">Contact Us</h2>

                        <form className='Contact_form' onSubmit={contactSubmit}>
                            <div className="mb-3 form_contact">
                                <label className="form-label">Name</label>
                                <input type="text" required value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} class="form-control" />

                            </div>
                            <div className="mb-3 form_contact">
                                <label className="form-label">Title</label>
                                <input type="text" required value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} class="form-control" />

                            </div>
                            <div className="mb-3 form_contact">
                                <label className="form-label">Email address</label>
                                <input type="email" required value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} class="form-control" />
                            </div>
                            <div className="mb-3 form_contact">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    size="11"
                                    minlength="10"
                                    maxlength="11"
                                    name="phone"
                                    path="note" min="1" max="5"

                                    // pattern="[0-10]{10}"
                                    required value={phone} placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} class="form-control no-arrow" />


                            </div>
                            <div className="mb-3 massage_content">
                                <label className="form-label">Message</label>
                                <textarea type="textarea" required value={content} placeholder="Content.." onChange={(e) => setContent(e.target.value)} className="form-control" />

                            </div>
                            <button className='btn btn-primary' type="submit">Submit</button>

                            <div className="message " ><b>{Message ? <h4>{Message}</h4> : null}</b></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    )
}
export default ContactForm;