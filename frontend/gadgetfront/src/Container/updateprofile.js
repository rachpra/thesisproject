import { Component } from "react";
import axios from 'axios'
class UpdateProfile extends Component {
    state = {
        fullname: "",
        phone: "",
        address: "",
        id: this.props.match.params.id
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    componentDidMount() {

        axios.get("http://localhost:90/user/single/" + this.state.id)
            .then((response) => {

                console.log(response.data)
                this.setState({
                    fullname: response.data.data.fullname,
                    phone: response.data.data.phone,
                    address: response.data.data.address

                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    Update = (e) => {
        e.preventDefault();
        axios.put('http://localhost:90/user/update/' + this.state.id, this.state)
            .then((response) => {
                console.log(response)
                alert(response.data.message)
                window.location.href = "/dashboard"
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    render() {
        return (
            <form className="pt-7 mb-4 ml-4 shadow" style={{ border: 'none', borderRadius: '10px', width: '300px', height: '450px' }}>
                <div className="update pt-2 mt-5 mb-3 ml-4">
                    <label for="productName">Name:</label>
                    <input type="text"  value={this.state.fullname} onChange={this.changeHandler} name="fullname" /><br />
                    <label for="lname">Phone:</label>
                    <input type="number"  name="phone" value={this.state.phone} onChange={this.changeHandler} /><br />
                
                    <label for="lname">Address:</label>
                    <input type="text" name="address" value={this.state.address} onChange={this.changeHandler} /><br />

                    <button type="submit" name="Update" className="btn btn-primary" onClick={this.Update}>Update</button>
                </div>
            </form>


        )
    }
}
export default UpdateProfile;