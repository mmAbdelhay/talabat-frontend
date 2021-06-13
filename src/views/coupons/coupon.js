import { message } from 'antd';
import { ServerIP } from "../../assets/config";
import axios from "axios";
import moment from 'moment'
import Demo from './couponFormComponent'

const Coupon = ()=> {
   
   
    const addcoupon = (values) => {

      console.log('lets test', moment())

        console.log('values in func= ',values)
        axios
          .post(`${ServerIP}/api/v1/superuser/coupons/add`, {
            coupon_name: values.coupon_name,
            discount_percentage: values.discount_percentage,
            expiration_date: values.expiration_date,
          },
          {
              headers: {
                    
                    Authorization: 'Token ' + localStorage.getItem("token")
              }
        })
          .then((res) => {
            console.log(res.data);
            message.success(`${res.data['Message']}`);
          })
          .catch((err) => {
            message.error(`coupon is invalid -> ${err}`);
            console.log(err);
          });
      };
    


    return(

      
        <div className="container">
            <div className="row">
                <div className="col"></div>
    
    
        
                    <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
                        <h2>Add Coupon</h2><hr/>
                        
                        <div style={{marginLeft:"250px"}}><Demo addcoupon = {addcoupon} /></div>
                        
        
                    </div>


                <div className="col"></div>

            </div>
        </div>

    )


}



export default Coupon;