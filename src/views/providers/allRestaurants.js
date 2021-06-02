import React from 'react';
import axios from "axios";
import RestaurantComponent from './restaurantComponent'
import {  Row, Col  } from 'antd'
import "antd/dist/antd.css";
import Item from 'antd/lib/list/Item';
// const {  Row, Col  } = antd;

class AllResturants extends React.Component{

  constructor(props){
      super(props);
      this.state={
        restaurants:[],
        searchedRests:[],
        searchstring:"",
      };
  }

  async componentDidMount() {
    const response = await axios.get("http://localhost:5000/api/v1/guest/restaurants/all", {});
    this.setState({restaurants:response.data.All_Restaurants,searchedRests:response.data.All_Restaurants})
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
          <h3 className="bg-light pb-1 pt-1 mb-5">All Restaurants</h3>
          <div className="input-group mb-3" style={{width:"30%"}}>
            <input type="text" className="form-control" placeholder="Name" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={this.handleSearchChange} value={this.state.searchstring}></input>
          </div>
        <div className="row">
        {this.state.searchedRests.map((item) => {
                  return (
                        <RestaurantComponent key={item.id} id={item.id} name={item.name} logo={item.logo} type={item.provider_type} />
                  );
              })}
        </div>
        </div>
       );
  }
}

export default AllResturants;