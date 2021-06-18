import React from 'react'
import {useState, useEffect} from 'react'
import "antd/dist/antd.css";
import {  Table, Tag, Space  } from 'antd';
import {  Button  } from 'antd';
import CouponPanelComponent from './couponPanelComponent'

const CouponPanel = () => {


    
    const [coupons, setCoupons] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect( () => {

        const getCoupons = async () => {
            const allCoupons = await fetchCoupons()
            setCoupons(allCoupons)



            


        }

        getCoupons();

    },[] );


/////////////////////////////////////////////////// fetch orders////////////////////////////////////////////////////////
    const fetchCoupons = async () => {

        console.log('coupons in fetch')

        const res = await fetch('http://localhost:5000/api/v1/superuser/coupons/getall',{
            mehtod: 'GET',

            headers:{
                Authorization: `Token ${token}`,
            }
        });

        
        
        const data = await res.json();
        
        console.log('coupons data: ', data)


        return data

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



/////////////////////////////////////////////////// delete orders ////////////////////////////////////////////////////////

const deleteCoupon = async (id) => {


    // await fetch( `http://localhost:5000/api/v1/superuser/coupons/delete/${id}`,{

    //         method:'DELETE',
            

    //         headers:{
    //             Authorization: `Token ${token}`,
    //         },
    
    //     }

    // )

    console.log(id);
    
    setCoupons(coupons.filter( (coupon) => coupon.id !== id ))



}



    

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

    )
}




export default CouponPanel