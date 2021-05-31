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
      };
  }

  async componentDidMount() {
    const response = await axios.get("http://localhost:5000/api/v1/guest/restaurants/all", {});
   console.log(response)
   console.log("----------------------");
   console.log(response.data);
   console.log(typeof response.data.All_Restaurants);
    this.setState({restaurants:response.data.All_Restaurants})
  }


  render(){
      
       return (
        //  <div>
        //   <div style={{
        //                 padding: '30px',
        //                 background: "#ececec"
        //               }}>
        //     <Row gutter={16}>
        //       {this.state.restaurants.map((item) => {
        //           return (
        //                 <RestaurantComponent key={item.id} id={item.id} name={item.name} logo={item.logo} type={item.provider_type} />
        //           );
        //       })}
        //     </Row>
        //   </div>
        //  </div>
        <div className="container border pt-2 shadow p-3 mb-5 bg-white rounded">
          <h3 className="bg-light pb-1 pt-1 mb-5">All Restaurants</h3>
        <div className="row">
        {this.state.restaurants.map((item) => {
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