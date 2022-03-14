import { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaPlusCircle } from 'react-icons/fa'
import axios from 'axios'


class CreatePromo extends Component {

    state = {

        topic: "",
        image: '',
        description: "",

        config: {
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        },
        items: []


    }
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
    deleteproduct = (id) => {
        axios.delete("http://localhost:90/message/delete/" + id)
            .then((response) => {
                console.log(response)
                alert(response.data.message)
                window.location.reload()

            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    fileHandler = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    createMessage = (e) => {
        e.preventDefault(); //prevents from reloading page
        const data = new FormData()
        data.append("topic", this.state.topic)
        data.append("image", this.state.image)
        data.append("description", this.state.description)


        // prevents from reloading page
        axios.post("http://localhost:90/message/insert", data)
            .then(
                (response) => {
                    console.log(response)
                    alert(response.data.message)
                    window.location.reload()
                }
            )
            .catch(
                (err) => {
                    alert(err)
                }
            )

    }




    render() {

        if (localStorage.getItem('token') && localStorage.getItem('userType') === 'Admin') {
            var createpromo =
                <div className="container-fluid">
                    

                        <div className="col" style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <div className="card">

                                <div className="card-body">
                                    <h2 className="card-title">Please fill details here</h2>

                                    <form>
                                        <div className="form-group">
                                            <label>Topic</label>
                                            <input type="text" className="form-control" name="topic" value={this.state.topic} onChange={this.changeHandler} required />

                                        </div>



                                        <div className="form-group">
                                            <label for="img">Image</label>
                                            <input type="file" name="image" className="form-control" onChange={this.fileHandler} accept="image/*" required />

                                        </div>

                                        <div className="form-group">
                                            <label>Description</label>
                                            <input type="text" className="form-control" name="description" value={this.state.description} onChange={this.changeHandler} required />

                                        </div>

                                        <button type="submit" onClick={this.createMessage} className="btn btn-primary"><FaPlusCircle /> Add promo</button>
                                    </form>



                                </div>

                           
                        </div>

                    </div>

                    <hr className="shadow" />
                    <div className="container-fluid">

                        <div className="container-fluid">
                            <div className="row">
                                {
                                    this.state.items.map((item) => {
                                        return (

                                            <div className="card shadow-lg" style={{ width: '16rem', height: 'auto', marginLeft: '29px', marginBottom:'15px' }}>
                                                <img className="card-img-top" src={"http://localhost:90/" + item.image.replace("\\", "/")} alt="Image Loading...." style={{ width: 'auto', height: '150px' }} />
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{ color: 'red' }}> {item.topic}</h5><br />

                                                    <label><b>Description:</b> </label> {item.description}<br />

                                                    <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteproduct.bind(this, item._id)}>Delete</button>
                                                     <Link to={'/updatecampaign/' + item._id}><button type="button" className="btn btn-primary btn-sm">Update</button></Link>  
                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>


        }

        return (



            <div>
                {createpromo}
            </div>






        )
    }
}
export default CreatePromo


















