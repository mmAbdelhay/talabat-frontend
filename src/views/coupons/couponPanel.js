import React from 'react'
import {useState, useEffect} from 'react'
import "antd/dist/antd.css";
import {  Table, Tag, Space  } from 'antd';
import {  Button  } from 'antd';
import CouponPanelComponent from './couponPanelComponent'
import ErrorPage from "../sharedComponents/ErrorPages/ErrorPage";
import axios from "axios";
import { ServerIP } from "../../assets/config";
import { message } from "antd";

const CouponPanel = () => {


    
    const [coupons, setCoupons] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [error, setError] = useState("");
    const [serverState,setState]= useState("")


    useEffect( () => {

       

        fetchCoupons();

    },[] );


/////////////////////////////////////////////////// fetch coupons////////////////////////////////////////////////////////
    const fetchCoupons = async () => {





        
        await axios
        .get(`${ServerIP}/api/v1/superuser/coupons/getall`,{
            headers: {
                Authorization:`Token ${token}`
              }
          })
        .then((res) => {
         console.log('this is res',res)
         setCoupons(res.data)
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


// const updateOrderState = async (record,status) => {

//     let state = {'state': status}

//      await fetch( `http://localhost:5000/api/v1/provider/orders/state/${record.id}`,{

//         method:'PUT',

//         headers:{
//             'Content-type': 'application/json',
//              Authorization: `Token ${token}`,
//         },
        
//         body: JSON.stringify(state)

        
        
//     })


//     console.log('rec', status )
    
//     setCoupons( orders.map(item => item.id === record.id ? {...item, order_status : status} : item ))
    
//     console.log(orders)

// }



/////////////////////////////////////////////////// delete coupons ////////////////////////////////////////////////////////

const deleteCoupon = async (id) => {


    // await fetch( `http://localhost:5000/api/v1/superuser/coupons/delete/${id}`,{

    //         method:'DELETE',
            

    //         headers:{
    //             Authorization: `Token ${token}`,
    //         },
    
    //     }

    // )

 


    await axios
    .delete(`${ServerIP}/api/v1/superuser/coupons/delete/${id}`,{
        headers: {
            Authorization:`Token ${token}`
          }
      }).then((res) => {
          
        setCoupons(coupons.filter( (coupon) => coupon.id !== id ))

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
                <h2>Coupons Admin Panel</h2><hr/>
                <CouponPanelComponent coupons = {coupons}  deleteCoupon= {deleteCoupon}/>

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




export default CouponPanel