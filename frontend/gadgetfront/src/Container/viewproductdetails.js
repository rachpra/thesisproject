import { Component } from "react";
import axios from 'axios'
import dashboard from './dashboard'
import { Link } from 'react-router-dom'
import { FaCartPlus } from "react-icons/fa";
class ViewProductDetails extends Component {

    state = {
      
        productName: "",
        productRate: "",
        productImage:"",
        id: this.props.match.params.id,



    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    btnaddCart = (id) => {
        //prevents from reloading page
       const data = new FormData()
       data.append("productName", this.state.productName)
       data.append("productRate", this.state.productRate)
       data.append("productImage",this.state.productImage)
 
   
     
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


    componentDidMount() {

        axios.get("http://localhost:90/product/single/" + this.state.id)
            .then((response) => {

                console.log(response.data)
                this.setState({
                    productImage:response.data.data.productImage,
                    productName: response.data.data.productName,
                    productRate: response.data.data.productRate,

                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }


    render() {
        return (



            <div className="card shadow-lg" style={{ width: '15rem', marginLeft: '14px', marginTop: '10px', marginBottom: '10px' }}>
                   <div className="card-body">
                <img className="card-img-top" src={"http://localhost:90/" + this.state.productImage.replace("\\", "/")} alt="Image Loading...." style={{ width: 'auto', height: '150px' }} /><br/><br/>
                Product Name: {this.state.productName}<br/>
                           
       
                Product Rate: {this.state.productRate}<br/><br/>
                           
                
               

                    <button type="submit" onClick={this.btnaddCart.bind(this, this.state.id)} className="btn btn-primary"><FaCartPlus/></button>
                 </div>      
</div>


        )
    }
}
export default ViewProductDetails;