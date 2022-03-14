import { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { FaRegTrashAlt, FaFileSignature} from 'react-icons/fa'


 
class Order extends Component {
    state =
        {
            items: []
        }
 
    //load initially with the load of webpage
    componentDidMount() {
        axios.get('http://localhost:90/cart/all')
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
 
    deleteproduct = (id) => {
        axios.delete("http://localhost:90/cart/delete/" + id)
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

            var order =
            <div className="container-fluid">
            <div className="row">
                {
                    this.state.items.map((item) => {
                        return (
                           
                            <div className="card shadow-lg" style={{width: '18rem', height:'auto', marginLeft:'14px', marginTop:'10px', marginBottom:'10px'}}>
                                
                                <div className="card-body">
                                    <h5 className="card-title" style={{color:'red'}}> {item.productName}</h5><br />
 
                                    <label><b>Description:</b> </label> {item.productDescription}<br/>

                                     <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteproduct.bind(this, item._id)}><FaRegTrashAlt/></button>
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
                {order}
            </div>
           
        )
    }
}
 
export default Order;