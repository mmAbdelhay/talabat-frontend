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
      // this.pageSize = 3;
      this.state={
        restaurants:[],
        searchedRests:[],
        searchstring:"",
        currentPage: 1,
        postsPerPage:3,
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

  handlePaginationClick(e) {
    // console.log(typeof parseInt(e.target.innerHTML));
    e.preventDefault();

    this.setState({
      currentPage: parseInt(e.target.innerHTML)
    });
    
  }

  render(){
    let pagesCount = Math.ceil(this.state.searchedRests.length / this.state.postsPerPage);
    let indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    let indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    let curentPosts = this.state.searchedRests.slice(indexOfFirstPost, indexOfLastPost);
       return (
        <div className="container border pt-2 shadow p-3 mb-5 bg-white rounded">
          <h3 className="bg-light pb-1 pt-1 mb-5">All Restaurants</h3>
          <div className="input-group mb-3" style={{width:"30%"}}>
            <input type="text" className="form-control" placeholder="Name" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={this.handleSearchChange} value={this.state.searchstring}></input>
          </div>
        <div className="row">
        {curentPosts.map((item) => {
                  return (
                        <RestaurantComponent key={item.id} id={item.id} name={item.name} logo={item.logo} type={item.provider_type} />
                  );
              })}
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            {[
              ...Array(pagesCount),
            ].map((value, index) => (
              <li class="page-item" onClick={(e)=>this.handlePaginationClick(e)}><a class="page-link" href="#">{index+1}</a></li>
            ))}
            {/* <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li> */}
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
        </div>
       );
  }
}

export default AllResturants;