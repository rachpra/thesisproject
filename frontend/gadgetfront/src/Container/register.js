import {Component} from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'

class Register extends Component {

    state = {

        fullname: "",
        address: "",
        phone: "",
        email: "",
        password: "",
        userType:"Customer"

    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitUser = (e) => {
        e.preventDefault(); // prevents from reloading page
        axios.post("http://localhost:90/user/registration", this.state)
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
            <section className="Form my-4 mx-5 pt-5 pb-5">
                <div className="container">
                <div className="row no-gutters shadow" style={{background:'white', borderRadius:'3px'}}>
                        <div className="col-lg-5">
                            
                                <img src="./images/user-registration.png" alt="register" className="img-fluid" style={{marginTop:'100px' }} />

                            
                        </div>
                        <div className="col-lg-7">
                         

                            <h1 className="font-weight-bold py-4">Sign Up</h1>
                        <h5>Please fill all your correct details to signup</h5>
                                    <form className="py-4">
                                        <div className="form-row">
                                        <div className="col-lg-7">
                                            <label htmlFor="fullname">Fullname</label>
                                            <input type="text" className="form-control" name="fullname" value={this.state.fullname} onChange={this.changeHandler} required />
                                        </div>
                                        </div>

                                        <div className="form-row">
                                        <div className="col-lg-7">
                                            <label htmlFor="address">Address</label>
                                            <input type="text" className="form-control" name="address" value={this.state.address} onChange={this.changeHandler} required />
                                        </div>
                                        </div>
                                        <div className="form-row">
                                        <div className="col-lg-7">
                                            <label htmlFor="phone">Phone</label>
                                            <input type="text" className="form-control" name="phone" value={this.state.phone} onChange={this.changeHandler} required />
                                        </div>
                                        </div>

                                        <div className="form-row">
                                        <div className="col-lg-7">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.changeHandler} required />
                                        </div>
                                        </div>

                                        <div className="form-row">
                                        <div className="col-lg-7">
                                            <label htmlFor="password">Password:</label>
                                            <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.changeHandler} required />
                                        </div>
                                        </div>


                                        <p className="signUp text-left">Do have an Account?  <Link exact to="/"><b>Sign in</b></Link></p>
                                        <div className="col-lg-7 py-4">
                                        <button type="submit" onClick={this.submitUser} className="btn btn-primary"> Sign up </button>
                                   </div>
                                    </form>



                                </div>

                            </div>
                        </div>
                   
                
            </section>


        )
    }
}
export default Register


















