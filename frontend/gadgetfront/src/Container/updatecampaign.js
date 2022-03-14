import { Component } from "react";
import axios from 'axios'
class UpdateCampaign extends Component {
    state = {
        topic: "",
        description: "",
        id: this.props.match.params.id     
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    componentDidMount() {  
        
        axios.get("http://localhost:90/message/single/" + this.state.id)
            .then((response) => {
                
                console.log(response.data)
                this.setState({
                    topic: response.data.data.topic,
                   description: response.data.data.description,

                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    updateMessage = (e) => {    
        e.preventDefault();
        axios.put('http://localhost:90/message/update/' + this.state.id, this.state)
            .then((response) => {
                console.log(response)
               alert(response.data.message)  
               window.location.href="/createpromo"        
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    render() {
        return (
            <form className="pt-7 mb-4 ml-4 shadow" style={{border:'none', borderRadius:'10px', width:'300px', height:'450px'}}>
                <div className="update pt-2 mt-5 mb-3 ml-4">
  <label for="productName">Topic:</label>
  <input type="text"  value={this.state.topic} onChange={this.changeHandler} name="topic" /><br/>
  <label for="lname">Description:</label>
  <input type="text"  name="description" value={this.state.description} onChange={this.changeHandler}/><br/>
  
  
  <button type="submit" name="updateMessage" className="btn btn-primary" onClick={this.updateMessage}>Update Message</button>
  </div>
</form>

            
        )
    }
}
export default UpdateCampaign;