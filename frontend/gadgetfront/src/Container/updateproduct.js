import { Component } from "react";
import axios from 'axios'
class UpdateProduct extends Component {
    state = {
        productName: "",
        productRate: "",
        productDescription: "",
        productCompany: "",
        productCategory: "",
        productQuantity:"",
        id: this.props.match.params.id     
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    componentDidMount() {  
        
        axios.get("http://localhost:90/product/single/" + this.state.id)
            .then((response) => {
                
                console.log(response.data)
                this.setState({
                    productName: response.data.data.productName,
                    productRate: response.data.data.productRate,
                    productDescription: response.data.data.productDescription,
                    productCompany: response.data.data.productCompany,
                    productCategory: response.data.data.productCategory,
                    productQuantity:response.data.data.productQuantity
                    
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    UpdateProduct = (e) => {    
        e.preventDefault();
        axios.put('http://localhost:90/product/update/' + this.state.id, this.state)
            .then((response) => {
                console.log(response)
               alert(response.data.message)  
               window.location.href="/viewproduct"        
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    render() {
        return (
            <form className="pt-7 mb-4 ml-4 shadow" style={{border:'none', borderRadius:'10px', width:'300px', height:'450px'}}>
                <div className="update pt-2 mt-5 mb-3 ml-4">
  <label for="productName">Product Name:</label>
  <input type="text" id="fname" value={this.state.productName} onChange={this.changeHandler} name="productName" /><br/>
  <label for="lname">Product Rate:</label>
  <input type="number" id="lname" name="productRate" value={this.state.productRate} onChange={this.changeHandler}/><br/>
  <label for="lname">Product Description:</label>
  <input type="text" id="lname" name="productDescription" value={this.state.productDescription} onChange={this.changeHandler}/><br/>
  <label for="lname">Product Company:</label>
  <input type="text" id="lname" name="productCompany" value={this.state.productCompany} onChange={this.changeHandler}/><br/>
  <label for="lname">Product Category:</label>
  <input type="text" id="lname" name="productCategory" value={this.state.productCategory} onChange={this.changeHandler}/><br/>
  <label for="lname">In Stock:</label><br/>
  <input type="text" id="lname" name="productQuantity" value={this.state.productQuantity} onChange={this.changeHandler}/><br/><br/>
  <button type="submit" name="UpdateProduct" className="btn btn-primary" onClick={this.UpdateProduct}>Update Product</button>
  </div>
</form>

            
        )
    }
}
export default UpdateProduct;