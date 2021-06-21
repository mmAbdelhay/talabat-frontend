import React from 'react';
import axios from "axios";
import { ServerIP } from "../../assets/config";
import ErrorPage from "../sharedComponents/ErrorPages/ErrorPage";
import { Link } from "react-router-dom";
import { Spin, Space } from 'antd';



class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      token:localStorage.getItem("token"),
      orders:[],
      error:''
     }
  }


  async componentDidMount() {
    this.getOrders();
  }

  getOrders=()=>{
    axios.get(`${ServerIP}/api/v1/client/info/allorders`, {
        headers:{
            Authorization: `Token ${this.state.token}`,
        }
    }).then((res) => { 
      this.setState({
          orders:res.data,
      },()=>console.log('hello',this.state.orders))
    }).catch((err) => {
      if (err.response)
        this.setState({error: err.response.status})
      else 
        this.setState({error: 500}) 
      
      console.log('this is error status',this.state.error)
    });
  }


  render() { 
    if(this.state.error){
      console.log('not hello')
      return( <ErrorPage err={`${this.state.error}`} />)
    }
    if(this.state.orders.length==0){
      return(<Space size="large">
              <Spin size="large" />
            </Space>)
    }
    return ( 
      <div className="container">
      <div className="row">
      <div className="col"></div>
      <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
      <h2>ALL Orders</h2><hr/>

      <div className="container">
        {this.state.orders.map(order=>{
          return(
            <Link to={order.order_status==`Delivered`?`/review/provider/${order.Provider.name}/${order.Provider.id}`:`/orderStatus/${order.id}`} >
            <div key={order.id} className="card mb-3 shadow" style={{height:300}}>
                <div className="row no-gutters">
                  <div className="col-md-4 ">
                    <div style={{borderRight:"2px solid #e9ecef",display:"flex",justifyContent:"center",alignItems:"center",height:300}}>
                      <img src={`${ServerIP}${order.Provider.logo}`} alt="..." style={{maxWidth:250,maxHeight:300}}></img>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title" style={{borderBottom:"2px solid #e9ecef",paddingBottom:20}}>{`Order ${order.id}`}</h5>
                      <p className="card-text" style={{color:"black"}}>
                        {`Total Price : ${order.total_price}`}
                      </p>
                      <p className="card-text" style={{color:"black"}}>
                        {`Date : ${order.createdAt.substr(0,10)} at ${order.createdAt.substr(12,4)}`}
                      </p>
                    </div>
                  </div>
                </div>
            </div>
            </Link>
          )
        })}

      </div>
      </div>
      <div className="col"></div>
      </div>
      </div>
     );
  }
}
 
export default Orders;


{/* <div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="..." alt="..."></img>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
    </div> */}