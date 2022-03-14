import { Component } from 'react';
import Register from './register';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './login'
import UserDetails from './userdetails'
import Dashboard from './dashboard';
import Contactus from './contactus'
import AddProduct from './addproduct';
import ViewProduct from './viewproduct';
import UpdateProduct from './updateproduct';
import MyProfile from './myprofile';
import CreatePromo from './createpromo';
import MyPromotions from './promotions';
import Subscriber from './subscribers';
import MyCart from './mycart';
import Order from './orders';
import ViewProductDetails from './viewproductdetails';
import CheckOut from './checkout';
import UpdateCampaign from './updatecampaign'

import UpdateProfile from './updateprofile'

class Container extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                <Switch>
                   
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/contact" component={Contactus} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/subscribers" component={Subscriber}/>
            
                    <Route exact path="/addproduct" component={AddProduct}/>
                    <Route exact path="/viewproduct" component={ViewProduct}/>
                    <Route exact path="/userdetails" component={UserDetails}/>
                    <Route exact path="/updateproduct/:id" component={UpdateProduct}/>
                    <Route exact path="/myprofile/:id" component={MyProfile}/>
                    <Route exact path="/updateprofile/:id" component={UpdateProfile}/>
                    <Route exact path="/createpromo" component={CreatePromo}/>
                    <Route exact path="/promotions" component={MyPromotions}/>
                    <Route exact path="/mycart" component={MyCart}/>
                    <Route exact path="/orders" component={Order}/>
                    <Route exact path="/viewproductdetails/:id" component={ViewProductDetails}/>
                    <Route exact path="/checkout/:id" component={CheckOut}/>
                    <Route exact path="/updatecampaign/:id" component={UpdateCampaign}/>
                 
          
                    

                    
                    
                </Switch>
                </BrowserRouter>

            </div>





        )
    }
}

export default Container;