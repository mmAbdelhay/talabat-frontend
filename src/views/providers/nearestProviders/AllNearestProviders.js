import React from "react";
import axios from "axios";
import { ServerIP } from "../../../assets/config";
import "antd/dist/antd.css";
import Item from "antd/lib/list/Item";
import { Button, h1 } from "antd";
import NearRestaurant from "./NearRestaurant";

class AllNearestProviders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      // resLat : 31.106267,
      // resLng : 29.756120,
      searchedRests: [],
      searchstring: "",
      currentPage: 1,
      postsPerPage: 4,
      resLat: sessionStorage.getItem("nearlat"),
      resLng: sessionStorage.getItem("nearlng"),
    };
  }

  async componentDidMount() {
    const response = await axios.post(
      `${ServerIP}/api/v1/guest/lookup/nearproviders`,
      { latitude: this.state.resLat, longitude: this.state.resLng }
    );
    this.setState({
      restaurants: response.data.Message,
      searchedRests: response.data.Message,
    });
  }

  handleClick() {
    let sortedAtoZ = this.state.searchedRests;
    sortedAtoZ.sort(function (a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    this.setState({ searchedRests: sortedAtoZ });
  }
  handleSortOrder() {
    let sortedmo = this.state.searchedRests;
    sortedmo.sort(function (a, b) {
      return a.minimum_order - b.minimum_order;
    });
    this.setState({ searchedRests: sortedmo });
  }
  handleFastest() {
    let sortedFastest = this.state.searchedRests;
    sortedFastest.sort(function (a, b) {
      let h1 = a.delivery_time.split(":");
      let y1 = parseInt(h1[0]) * 60 + parseInt(h1[1]);
      let h2 = b.delivery_time.split(":");
      let y2 = parseInt(h2[0]) * 60 + parseInt(h2[1]);
      return y1 - y2;
    });
    this.setState({ searchedRests: sortedFastest });
  }
  handleSearchChange = (e) => {
    this.setState({ searchstring: e.target.value }, () => {
      let searchedRestaurants = this.state.restaurants.filter((rest) =>
        rest.name.startsWith(this.state.searchstring)
      );
      this.setState({ searchedRests: searchedRestaurants });
    });
  };
  handlePaginationClick(e) {
    // console.log(typeof parseInt(e.target.innerHTML));
    e.preventDefault();

    this.setState({
      currentPage: parseInt(e.target.innerHTML),
    });
  }

  handlePaginationNextClick(e) {
    e.preventDefault();
    let pagesCount = Math.ceil(
      this.state.searchedRests.length / this.state.postsPerPage
    );
    let nextPage =
      this.state.currentPage < pagesCount
        ? this.state.currentPage + 1
        : this.state.currentPage;
    this.setState({
      currentPage: nextPage,
    });
  }

  handlePaginationPrevClick(e) {
    e.preventDefault();
    let prevPage =
      this.state.currentPage > 1
        ? this.state.currentPage - 1
        : this.state.currentPage;
    this.setState({
      currentPage: prevPage,
    });
  }
  render() {
    let pagesCount = Math.ceil(
      this.state.searchedRests.length / this.state.postsPerPage
    );
    let indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    let indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    let curentPosts = this.state.searchedRests?.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    return (
      <div className="container border pt-2 shadow p-3 mb-5 bg-white rounded">
        <h3 className="row bg-light p-2 mb-5">Nearest Restaurants</h3>

        <div className="row">
          <div className="col-md-4 input-group mb-3" style={{ width: "30%" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={this.handleSearchChange}
              value={this.state.searchstring}
            ></input>
          </div>
          <div className="col-md-6 border-bottom border-top mb-3">
            <span className="mr-5">Sort By :</span>
            <span>
              <Button
                type="text"
                onClick={() => this.handleClick()}
                className="text-muted"
              >
                A-Z
              </Button>
            </span>
            <span>
              <Button
                type="text"
                onClick={() => this.handleSortOrder()}
                className="text-muted"
              >
                Min.Order Amount
              </Button>
            </span>
            <span>
              <Button
                type="text"
                onClick={() => this.handleFastest()}
                className="text-muted"
              >
                Fastest Delivery
              </Button>
            </span>
          </div>
        </div>
        <div className="row">
          {curentPosts.map((item) => {
            return (
              <NearRestaurant
                key={item.id}
                id={item.id}
                name={item.name}
                logo={item.logo}
                delivertime={item.delivery_time}
                fee={item.delivery_fee}
                minimum={item.minimum_order}
              />
            );
          })}
        </div>
        {pagesCount > 1 ? (
          <nav aria-label="Page navigation example " className="mt-5">
            <ul class="pagination">
              <li
                class="page-item"
                onClick={(e) => this.handlePaginationPrevClick(e)}
              >
                <a class="page-link">Previous</a>
              </li>
              {[...Array(pagesCount)].map((value, index) => (
                <li
                  class="page-item"
                  onClick={(e) => this.handlePaginationClick(e)}
                >
                  <a class="page-link">{index + 1}</a>
                </li>
              ))}
              <li class="page-item">
                <a
                  class="page-link"
                  onClick={(e) => this.handlePaginationNextClick(e)}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default AllNearestProviders;
