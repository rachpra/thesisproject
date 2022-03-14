import { Component } from "react";
import axios from 'axios'
import dashboard from './dashboard'
import { Link } from 'react-router-dom'
import { data } from "jquery";
class CheckOut extends Component {

    state = {

        productName: "",
        productRate: "",
        productQuantity:"",
        id: this.props.match.params.id

    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {

        axios.get("http://localhost:90/addcart/single/" + this.state.id)
            .then((response) => {

                console.log(response.data)
                this.setState({
                    
                    productName: response.data.data.productName,
                    productRate: response.data.data.productRate,
                    hasBeenClicked: true



                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    btnCheckout = (e) => {
        e.preventDefault(); // prevents from reloading page
        axios.post("http://localhost:90/mycart/insert/", this.state)
            .then(
                (response) => {
                    console.log(response)
                    alert(response.data.message)
                    window.location.href = "/mycart"
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



            
                <form className="pt-4 ml-5 mb-5">
                  
                        <label>Product Name</label>
                        <input type="text" className="form-control" name="productName" value={this.state.productName} onChange={this.changeHandler} readOnly />
               
                        <label>Product Rate</label>
                        <input type="text" className="form-control" name="prroductRate" value={this.state.productRate} onChange={this.changeHandler} readOnly />
                        <label>Product Rate</label>
                        <input type="text" className="form-control" name="prroducQuantity" value={this.state.productQuantity} onChange={this.changeHandler} /><br/>
                   
                    <button type="submit" onClick={this.btnCheckout} className="btn btn-primary">Checkout</button>
                </form>
          



        )
    }
}
export default CheckOut;