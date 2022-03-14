import { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { FaRegTrashAlt, FaFileSignature } from 'react-icons/fa'



class MyCart extends Component {
    state =
        {
            consumerID:"",
            productName:"",
            productImage:"",
            productRate:"",
            items: [],
            id: this.props.match.params.id,
            config: {
                headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
            },
        }

    //load initially with the load of webpage
    componentDidMount() {

        axios.get('http://localhost:90/getcart/all/', {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((alldata) => {
                console.log(alldata)
                this.setState({
                    items: alldata.data.cartdata
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    deletecart = (pid) => {
        axios.delete("http://localhost:90/addcart/delete/" + pid)
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

        var viewproduct =

            <div className="container-fluid">
                <div className="row">
                    {
                        this.state.items.map((item) => {
                            return (

                                <div className="card shadow-lg" style={{ width: '18rem', height: 'auto', marginLeft: '14px', marginTop: '10px', marginBottom: '10px' }}>
                                    <div className="card-body">
                                        <img className="card-img-top" src={"http://localhost:90/" + item.productImage.replace("\\", "/")} alt="Image Loading...." style={{ width: 'auto', height: '150px' }} /><br/>
                                        {item.productName}<br />
                                        {item.productRate}<br />

                                        <p> <button type="button" className="btn btn-danger btn-sm" onClick={this.deletecart.bind(this, item._id)}><FaRegTrashAlt /></button>
                                         </p>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>





        return (
            <div>
                {viewproduct}
            </div>

        )
    }
}

export default MyCart;