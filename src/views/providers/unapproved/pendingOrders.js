import React from 'react'
import {useState, useEffect} from 'react'
import "antd/dist/antd.css";
import {  Table, Tag, Space  } from 'antd';
import {  Button  } from 'antd';
import OrderComponent from './orderComponent'

const PendingOrders = () => {

    const [orders, setOrders] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect( () => {

        const getOrders = async () => {
            const provOrders = await fetchOrders()
            setOrders(provOrders)



            


        }

        getOrders();

    },[] );


/////////////////////////////////////////////////// fetch orders////////////////////////////////////////////////////////
    const fetchOrders = async () => {


        const res = await fetch('http://localhost:5000/api/v1/provider/orders/',{
            mehtod: 'GET',

            headers:{
                Authorization: `Token ${token}`,
            }
        });

        
        console.log('orders data: ', res)
        
        const data = await res.json();
        
        

        return data

    }

/////////////////////////////////////////////////// update orders state////////////////////////////////////////////////////////


const updateOrderState = async (record,status) => {

    let state = {'state': status}

     await fetch( `http://localhost:5000/api/v1/provider/orders/state/${record.id}`,{

        method:'PUT',

        headers:{
            'Content-type': 'application/json',
             Authorization: `Token ${token}`,
        },
        
        body: JSON.stringify(state)

        
        
    })


    console.log('rec', status )
    
    setOrders( orders.map(item => item.id === record.id ? {...item, order_status : status} : item ))
    
    console.log(orders)

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
    
    setOrders(orders.filter( (order) => order.id !== id ))



}



    

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

    )
}



export default PendingOrders