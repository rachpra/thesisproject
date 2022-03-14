import { Component } from "react";
import { FaFacebookSquare, FaGooglePlusSquare, FaGithubSquare,FaInstagramSquare  } from 'react-icons/fa'

import axios from 'axios'


 
class UserDetails extends Component {
    state =
        {
            items: []
        }
 
    //load initially with the load of webpage
    componentDidMount() {
        axios.get('http://localhost:90/user/all')
            .then((alldata) => {
                console.log(alldata)
                this.setState({
                    items: alldata.data.userData
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
 
   
 
    render() {

        if (localStorage.getItem('token') && localStorage.getItem('userType') === 'Admin') {
            var userdetailsa =
            
            <div className="container-fluid" style={{marginBottom:'10px', marginTop:'10px'}}>
                <div className="row">
                    {
                        this.state.items.map((item) => {
                            return (
                               
                                <div className="card text-white bg-success mb-3 shadow" style={{maxWidth: 'auto', marginLeft:'10px'}}>
                               
                                    <div className="card-body">
                                        <h4 className="card-title"> {item.fullname}<span className="badge badge-pill badge-warning">{item.userType}</span></h4><hr style={{border: '1px solid white'}}/>
                                        <label><b>Email: </b> </label> {item.email}<br/>
                                        <label><b>Address:</b> </label> {item.address} <br/>
                                        <label><b>Phone:</b> </label> {item.phone} <br/>
                                        <button className="btn" href="/https://www.facebook.com/"><FaFacebookSquare/></button><button className="btn" href="/https://www.facebook.com/"><FaGooglePlusSquare/></button><button className="btn" href="/https://www.facebook.com/"><FaGithubSquare/></button><button className="btn" href="/https://www.facebook.com/"><FaInstagramSquare/></button>

                                        
                                    </div>
                                </div>
                            
                               
                            )
                        })
                    }
                </div>
            </div>
          





        }
        return (
            <div>
{userdetailsa}
            </div>
           
        )
    }
}
 
export default UserDetails;