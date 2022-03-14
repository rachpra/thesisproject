import { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { FaRegTrashAlt, FaFileSignature} from 'react-icons/fa'


 
class ViewProduct extends Component {
    state =
        {
            items: []
        }
 
    //load initially with the load of webpage
    componentDidMount() {
        axios.get('http://localhost:90/product/all')
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
 
    deleteProduct = (id) => {
        axios.delete("http://localhost:90/product/delete/" + id)
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
                           
                            <div className="card shadow-lg" style={{ width: '18rem', height: 'auto', marginLeft: '13px', marginTop: '10px', marginBottom: '10px' }}>
                            <h5 className="card-header" style={{backgroundColor:'tomato', color:'white'}}> <b>{item.productName}</b></h5>
                            <div className="card-body">
                            <img className="card-img-top" src={"http://localhost:90/" + item.productImage.replace("\\", "/")} alt="image" style={{ width: 'auto', height: '150px' }} /><br/>
                                <label><b>Rate: </b> </label> {item.productRate}<br />
                                <label><b>Description: </b> </label> {item.productDescription} <br/>
                                <label><b>Company: </b> </label> {item.productCompany} <br />
                                <label><b>Category: </b> </label> {item.productCategory} <br />
                                <label><b>Company: </b> </label> {item.productQuantity} <br />
                                <Link to={'/updateproduct/' + item._id}><button type="button" className="btn btn-success btn-sm"><FaFileSignature/></button></Link>  
                                <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteProduct.bind(this, item._id)}><FaRegTrashAlt/></button> 
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
 
export default ViewProduct;