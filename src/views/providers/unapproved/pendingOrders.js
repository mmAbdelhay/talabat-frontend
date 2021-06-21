import React from 'react'
import {useState, useEffect} from 'react'
import "antd/dist/antd.css";
import OrderComponent from './orderComponent'
import ErrorPage from "../../sharedComponents/ErrorPages/ErrorPage";
import axios from "axios";
import { ServerIP } from "../../../assets/config";
import { message } from "antd";

const PendingOrders = () => {

    const [orders, setOrders] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [error, setError] = useState("");
    const [serverState,setState]= useState("")

    useEffect( () => {

      
        console.log('i fire once')
        fetchOrders();

    },[]);


/////////////////////////////////////////////////// fetch orders////////////////////////////////////////////////////////
    const fetchOrders = async () => {


      


        await axios
        .get(`${ServerIP}/api/v1/provider/orders/`,{
            headers: {
                Authorization:`Token ${token}`
              }
          })
        .then((res) => {
         console.log('this is res',res)
         setOrders(res.data)
         setState('up')
        })
        .catch((err) => {
            if (err.response)
              setError(err.response.status)
            else 
              setError(500)
          
        });











    }

/////////////////////////////////////////////////// update orders state////////////////////////////////////////////////////////


const updateOrderState = async (record,status) => {

    let state = {'state': status}

     


    


    




    await axios
    .put(`${ServerIP}/api/v1/provider/orders/state/${record.id}`,state,{
        headers: {
            Authorization:`Token ${token}`
          }
      }).then((res) => {
        console.log('rec', status )
    
        setOrders( orders.map(item => item.id === record.id ? {...item, order_status : status} : item ))
        
        console.log(orders)
      })
      .catch((err) => {
          if(err.response)
              message.error(err);
          else
              message.error('server is down')
        console.log(err);
      });
    

    

}



/////////////////////////////////////////////////// delete orders ////////////////////////////////////////////////////////

const deleteOrder = async (id) => {


    // await fetch( `http://localhost:5000/api/v1/provider/orders/delete/${id}`,{

    //         method:'DELETE',
            

    //         headers:{
    //             Authorization: `Token ${token}`,
    //         },
    
    //     }

    // )

    await axios
    .delete(`${ServerIP}/api/v1/provider/orders/delete/${id}`,{
        headers: {
            Authorization:`Token ${token}`
          }
      }).then((res) => {
          
        setOrders(orders.filter( (order) => order.id !== id ))

      })
      .catch((err) => {
          if(err.response)
              message.error(err);
          else
              message.error('server is down')
        console.log(err);
      });
    

    



}



    
    if(serverState==='up'){
    return(

    <div className="container">
        <div className="row">
            <div className="col"></div>



            <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
                <h2>pending orders</h2><hr/>
                <OrderComponent orders = {orders} updateOrderState = {updateOrderState} deleteOrder= {deleteOrder}/>

            </div>


    


            <div className="col "></div>
        </div>
    </div>

    )}

    if (error){
        return( <ErrorPage err={`${error}`} />)
       }
     
    return false
}



export default PendingOrders