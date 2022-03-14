import { Component } from "react";

import axios from 'axios'
import { Link } from 'react-router-dom'



class MyProfile extends Component {


    state = {
        fullname: "",
        address: "",
        phone: "",
        email: "",
        id: this.props.match.params.id,

    }

    componentDidMount() {
        axios.get('http://localhost:90/user/single/' + this.state.id)
            .then((alldata) => {
                console.log(alldata)
                this.setState({

                    fullname: alldata.data.data.fullname,
                    email: alldata.data.data.email,
                    phone: alldata.data.data.phone,
                    address: alldata.data.data.address

                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    render() {
        return (
<div>
           
                    {
                        <div className="card shadow-lg" style={{ width: '20rem', height: 'auto', marginLeft: '14px', marginTop: '10px', marginBottom: '10px' }}>
                            <h3 className="card-header" style={{backgroundColor:'tomato', color:'white'}}> <b>{this.state.fullname}</b></h3>
                            <div className="card-body">
                                <img class="card-img-top" src="/images/profileimage.webp" alt="Card image cap" /><hr />
                                <label><b>Phone: </b> </label> {this.state.phone}<br /><hr />
                                <p><label><b>Email: </b> </label> {this.state.email} </p><hr />
                                <label><b>Address: </b> </label> {this.state.address} <br /><hr />
                                <Link to={'/updateprofile/' + this.state.id}><button type="button" className="btn btn-success btn-sm">Update Profile</button></Link>  
                            </div>
                        </div>

                    }
                    </div>
             
        )
    }
}

export default MyProfile;