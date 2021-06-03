import React from 'react';
import axios from "axios";
import "antd/dist/antd.css";
import Item from 'antd/lib/list/Item';
import RestaurantComponent from '../restaurantComponent';
import { message } from 'antd';

class AllNearestProviders extends React.Component{

  constructor(props){
      super(props);
      this.state={
        restaurants:[],
        resLat : 31.106267,
        resLng : 29.756120
        // resLat : sessionStorage.getItem('nearlat'),
        // resLng: sessionStorage.getItem('nearlng') 
      };
  }

  async componentDidMount() {
    const response = await axios.post("http://localhost:5000/api/v1/guest/lookup/nearproviders", {latitude: this.state.resLat,
    longitude: this.state.resLng});
   //console.log(response)
   console.log("----------------------");
   console.log(response.data.Message);
   //console.log(typeof response.data.All_Restaurants);
    this.setState({restaurants:response.data.Message})
  }


  render(){
      
       return (
        <div className="container border pt-2 shadow p-3 mb-5 bg-white rounded">
          <h3 className="bg-light pb-1 pt-1 mb-5">All Restaurants</h3>
        <div className="row">
        {this.state.restaurants?.map((item) => {
                  return (
                        <RestaurantComponent key={item.id} id={item.id} name={item.name} logo={item.logo} type={item.provider_type} />
                  );
              })}
        </div>
        </div>
       );
  }
}

export default AllNearestProviders;