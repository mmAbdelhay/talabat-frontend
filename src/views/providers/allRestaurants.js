import React from 'react';
import axios from "axios";
import RestaurantComponent from './restaurantComponent'
import { ServerIP } from "../../assets/config";

class AllResturants extends React.Component{

  constructor(props){
      super(props);
      this.state={
        restaurants:[],
        searchedRests:[],
        searchstring:"",
        currentPage: 1,
        postsPerPage:3,
      };

  }

  async componentDidMount() {
    const response = await axios.get(`${ServerIP}/api/v1/guest/restaurants/all`, {});
    this.setState({restaurants:response.data.All_Restaurants,searchedRests:response.data.All_Restaurants})
  }

  handleSearchChange=(e)=>{
    this.setState({searchstring: e.target.value},()=>{
      let searchedRestaurants=this.state.restaurants.filter((rest)=>rest.name.startsWith(this.state.searchstring));
      this.setState({searchedRests:searchedRestaurants});
    });
  }

  handlePaginationClick(e) {
    e.preventDefault();
    this.setState({
      currentPage: parseInt(e.target.innerHTML)
    });
    
  }

  handlePaginationNextClick(e) {
    e.preventDefault();
    let pagesCount = Math.ceil(this.state.searchedRests.length / this.state.postsPerPage);
    let nextPage=this.state.currentPage<pagesCount?(this.state.currentPage+1):this.state.currentPage;
    this.setState({
      currentPage: nextPage
    });
    
  }

  handlePaginationPrevClick(e) {
    e.preventDefault();
    let prevPage=this.state.currentPage>1?(this.state.currentPage-1):this.state.currentPage;
    this.setState({
      currentPage: prevPage
    });
    
  }

  render(){
    let pagesCount = Math.ceil(this.state.searchedRests.length / this.state.postsPerPage);
    let indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    let indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    let curentPosts = this.state.searchedRests.slice(indexOfFirstPost, indexOfLastPost);
       return (
        <div className="container border pt-2 shadow p-3 mb-5 bg-white rounded">
          <h3 className="pb-1 pt-1 mb-5" style={{backgroundColor:"#F5F5F5"}}>All Restaurants</h3>
          {this.state.restaurants.length?<div className="input-group mb-3" style={{width:"30%"}}>
            <input type="text" className="form-control" placeholder="Name" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={this.handleSearchChange} value={this.state.searchstring}></input>
          </div>:""}
          {curentPosts.length?
          <div>
        <div className="row">
        {curentPosts.map((item) => {
                  return (
                        <RestaurantComponent key={item.id} id={item.id} name={item.name} logo={item.logo} type={item.provider_type} />
                  );
              })}
        </div>
        {pagesCount>1?<nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" onClick={(e)=>this.handlePaginationPrevClick(e)}><a class="page-link">Previous</a></li>
            {[
              ...Array(pagesCount),
            ].map((value, index) => (
              <li class="page-item" onClick={(e)=>this.handlePaginationClick(e)}><a class="page-link" >{index+1}</a></li>
            ))}
            <li class="page-item"><a class="page-link" onClick={(e)=>this.handlePaginationNextClick(e)}>Next</a></li>
          </ul>
        </nav>:""}</div>:<h1>No Restaurants Available</h1>}
        </div>
       );
  }
}

export default AllResturants;