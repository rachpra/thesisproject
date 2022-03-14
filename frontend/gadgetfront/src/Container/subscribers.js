import { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { FaRegTrashAlt, FaFileSignature, FaEnvelope} from 'react-icons/fa'


 
class Subscriber extends Component {
    state =
        {
            items: []
        }
 
    //load initially with the load of webpage
    componentDidMount() {
        axios.get('http://localhost:90/subscribe/all')
            .then((alldata) => {
                console.log(alldata)
                this.setState({
                    items: alldata.data.productData
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
 
    deleteEmail = (id) => {
        axios.delete("http://localhost:90/subscribe/delete/" + id)
            .then((response) => {
                console.log(response)
                alert(response.data.message)
                window.location.reload()
                
            })
            .catch((error) => {
                console.log(error.response)
            })
    }
 
    render() {
        if (localStorage.getItem('token') && localStorage.getItem('userType') === 'Admin') {

            var subscribe =
            <div className="container-fluid">
            <div className="row">
                {
                    this.state.items.map((item) => {
                        return (
                           
                            <div className="card shadow-lg" style={{width: '18rem', height:'auto', marginLeft:'14px', marginTop:'10px', marginBottom:'10px'}}>
                                
                                <div className="card-body">
                                    <h5 className="card-title" style={{color:'red'}}> {item.email}</h5><br />
                                

                                    <Link to=''><button type="button"  className="btn btn-primary btn-sm"><FaEnvelope/></button></Link>  <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteEmail.bind(this, item._id)}><FaRegTrashAlt/></button>
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
                {subscribe}
            </div>
           
        )
    }
}
 
export default Subscriber;