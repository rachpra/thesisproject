import { Component } from "react";
import axios from 'axios'




class MyPromotions extends Component {
    state =
        {
            items: []
        }
        

    //load initially with the load of webpage
    componentDidMount() {
        axios.get('http://localhost:90/message/all')
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



    render() {
        
        return (
            
<div>

                        {
                            this.state.items.map((item) => {
                                return (

                                    <div className="card" style={{width:'auto',height:'auto', marginTop:'10px',marginBottom:'10px'}}>
                                        <h4 className="card-header bg-white">{item.topic}</h4>
                                        <div className="card-body">
                                            <img className="card-img-top" src={"http://localhost:90/" + item.image.replace("\\", "/")} alt="Promo image" style={{ width: 'auto', height: '150px' }} />
                                            <h6 classname="card-text">{item.description} </h6>
                                            
                                            
                                            
                                            
                                        </div>
                                    </div>
                                    

                                )
                            })
                        }
                   </div>

        )
    }
}

export default MyPromotions;