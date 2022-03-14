import { Component } from 'react';

import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaCartPlus, FaExpandAlt } from "react-icons/fa";

class Dashboard extends Component {
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

    btnaddCart = (id) => {
         //prevents from reloading page
        const data = new FormData()
        data.append("productName", this.state.productName)
        data.append("productRate", this.state.productRate)
        data.append("productImage",this.state.productImage)
        data.append("consumerID", this.state.consumerID)
    
      
         // prevents from reloading page
        axios.post("http://localhost:90/addtocart/insert/"+id, data, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(
                (response) => {
                    console.log(response)
                    alert(response.data.message)
                    window.location.href='/mycart'
                }
            )
            .catch(
                (err) => {
                    alert(err)
                }
            )

    }


    render() {
        {
            if (localStorage.getItem('token') && localStorage.getItem('userType') === 'Admin') {
                var redirect =


                    <div>
                        <img src="./images/admine.png" alt="dashboard" style={{height:'auto', width:'100%'}} className="img-fluid" />

                    </div>


            }
            else if (localStorage.getItem('token') && localStorage.getItem('userType') === 'Customer') {
                redirect =
                

                 
                                    <div className="row">
                                        

                                        {
                                            this.state.items.map((item) => {
                                                return (

                                                    <div className="card shadow-lg" style={{ width: '15rem', height: 'auto', marginLeft: '11px', marginTop: '10px', marginBottom: '10px' }}>
                                                        <img className="card-img-top" src={"http://localhost:90/" + item.productImage.replace("\\", "/")} alt="Image Loading...." style={{ width: 'auto', height: '150px' }} />
                                                        <div className="card-body">
                                                            <h5 className="card-title" style={{ color: 'red' }}> {item.productName}</h5>
                                                            <label><b>NPR</b> </label> {item.productRate}<br />

                                              <button type="button" onClick={this.btnaddCart.bind(this, item._id)} className="btn btn-danger btn-sm"><FaCartPlus/></button>
                                                            <Link to={'/viewproductdetails/' + item._id}> <button type="button" className="btn btn-success btn-sm"><FaExpandAlt/></button></Link>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        }
                                    </div>
                               


            }

        }
        return (

            <div>
                                    {redirect}
                                </div>
        )
    }
}

export default Dashboard;