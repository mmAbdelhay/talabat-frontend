import React from 'react';
import axios from "axios";
import "antd/dist/antd.css";
import Item from 'antd/lib/list/Item';
import { Button } from 'antd';
import NearRestaurant from './NearRestaurant';

class AllNearestProviders extends React.Component{

  constructor(props){
      super(props);
      this.state={
        restaurants:[],
        resLat : 31.106267,
        resLng : 29.756120,
        searchedRests:[],
        searchstring:"",
        // resLat : sessionStorage.getItem('nearlat'),
        // resLng: sessionStorage.getItem('nearlng') 
      };
  }

  async componentDidMount() {
    const response = await axios.post("http://localhost:5000/api/v1/guest/lookup/nearproviders", {latitude: this.state.resLat,
    longitude: this.state.resLng});
    this.setState({restaurants:response.data.Message,searchedRests:response.data.Message})
  }

  handleClick() {
   
    console.log(this.state.searchedRests);
  
  }
  handleSearchChange=(e)=>{
    this.setState({searchstring: e.target.value},()=>{
      let searchedRestaurants=this.state.restaurants.filter((rest)=>rest.name.startsWith(this.state.searchstring));
      this.setState({searchedRests:searchedRestaurants});
    });
  }
  render(){
      
       return (
        <div className="container border pt-2 shadow p-3 mb-5 bg-white rounded">
          
          <h3 className="row bg-light p-2 mb-5">Nearest Restaurants</h3>
          
          <div className="row">
          <div className="col-md-4 input-group mb-3" style={{width:"30%"}}>
            <input type="text" className="form-control" placeholder="Name" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={this.handleSearchChange} value={this.state.searchstring}></input>
          </div>
          <div className="col-md-6 border-bottom border-top mb-3">
          <span className="mr-5">Sort By :</span>
          <span><Button type="text" onClick={() => this.handleClick()} className="text-muted">A-Z</Button></span>
          <span><Button type="text" className="text-muted">Min.Order Amount</Button></span>
          <span><Button type="text" className="text-muted">Fastest Delivery</Button></span>
          </div>
          </div>
        <div className="row">
        {this.state.searchedRests.map((item) => {
                  return (
                        <NearRestaurant key={item.id} id={item.id} name={item.name} logo={item.logo} delivertime={item.delivery_time} fee={item.delivery_fee} minimum={item.minimum_order} />
                  );
              })}
        </div>
        </div>
       );
  }
}

export default AllNearestProviders;