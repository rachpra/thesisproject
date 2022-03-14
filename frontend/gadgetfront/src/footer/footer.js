import { Component } from "react"

import '../App.css';
import { Link } from 'react-router-dom'

import axios from 'axios'
class Footer extends Component {
    state = {

        email: "",
    


    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitEmail = (e) => {
        e.preventDefault(); // prevents from reloading page
        axios.post("http://localhost:90/subscribe/insert", this.state)
            .then(
                (response) => {
                    console.log(response)
                    alert(response.data.message)
                }
            )
            .catch(
                (err) => {
                    alert(err)
                }
            )

    }
    render() {
        return (
            <footer id="footer" className="footer-1">
                <div className="main-footer widgets-dark typo-light">
                    <div className="container">
                        <div className="row">

                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="widget subscribe no-box">
                                    <h5 className="widget-title">NEPKART<span></span></h5>
                                   
                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="widget no-box">
                                    <h5 className="widget-title">Quick Links<span></span></h5>
                                    <ul className="thumbnail-widget">
                                        <li>
                                            <div className="thumb-content"><a  href="/register">Get Started</a></div>
                                        </li>
                                        <li>
                                            <div className="thumb-content"><a  target="_blank" href="https://fortune.com/worlds-greatest-leaders/2019/">Top Leaders</a></div>
                                        </li>
                                        <li>
                                            <div className="thumb-content"><a  target="_blank" href="https://www.psdintl.org/success-stories?gclid=CjwKCAjwx6WDBhBQEiwA_dP8raMUPkOpy5MLYK2m_yFmmOJMMxbxF8z-Vap8BMar5Her60TfqCsfEhoCmRIQAvD_BwE">Success Stories</a></div>
                                        </li>
                                        <li>
                                            <div className="thumb-content"><a href="/">Login</a></div>
                                        </li>
                                        <li>
                                            <div className="thumb-content"><a  target="_blank" href="https://ecommercenews.eu/" target="_blank">News</a></div>
                                        </li>
                                        <li>
                                            <div className="thumb-content"><a  target="_blank" href="https://www.theguardian.com/us/lifeandstyle">Lifestyle</a></div>
                                        </li>
                                        <li>
                                            <div className="thumb-content"><a  target="_blank" href="/Aboutgadgetshop">About</a></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="widget no-box">
                                    <h5 className="widget-title">Subscribe us<span></span></h5>
                                    <p>Get notification of our newly launched products.</p>
                                    <form>
                                        <div className="form-group">
                                            
                                           <input type="text" className="form-control" placeholder="Email address" name="email" value={this.state.email} onChange={this.changeHandler} required /><br/>
                                           <button type="submit" onClick={this.submitEmail} className="btn btn-primary"> Subscribe </button>
                                        </div>
                                        </form>

                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-6 col-md-3">

                                <div className="widget no-box">
                                    <h5 className="widget-title">Contact Us<span></span></h5>

                                    <p><Link to="www.gmail.com" target="_blank" title="glorythemes">nepkart@info.com</Link></p>
                                    <ul className="social-footer2">
                                        <li className=""><Link title="youtube" target="_blank" to="https://www.youtube.com/"><img alt="youtube" width="30" height="30" src="/images/youtube.svg" /></Link></li>
                                        <li className=""><Link to="https://www.facebook.com/" target="_blank" title="Facebook"><img alt="Facebook" width="30" height="30" src="/images/facebook.svg" /></Link></li>
                                        <li className=""><Link to="https://twitter.com" target="_blank" title="Twitter"><img alt="Twitter" width="30" height="30" src="/images/twitter.svg" /></Link></li>
                                        <li className=""><Link title="instagram" target="_blank" to="https://www.instagram.com/"><img alt="instagram" width="30" height="30" src="/images/insta.jpg" /></Link></li>
                                    </ul>
                                    <ul className="social-footer2">

                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="footer-copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <p>
                                    © 2021 - 2022 NEPKART</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer