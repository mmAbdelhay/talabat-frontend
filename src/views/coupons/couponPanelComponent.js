import {  Table, Tag, Space  } from 'antd';
import {  Button  } from 'antd';
import moment from 'moment'


const CouponPanelComponent = ({coupons , deleteCoupon}) => {


    const columns = [
        {
          title: 'Coupon name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
          width: '20%'
        },
        {
          title: 'Discount',
          dataIndex: 'discount',
          key: 'discount',
          width: '15%'
        },
        {
            title: 'Expiration Date',
            dataIndex: 'expiration_date',
            key: 'expiration_date',
            width: '25%'
        },
        {
          title: 'Status',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <>
              {tags.map(tag => {
                let expdate = moment(tag).format('MMMM DD YYYY')
                let now = moment().format('MMMM DD YYYY')
                let color, state
                
               // console.log('hellooo',moment().isSame())


                if (moment(expdate).isAfter(now)) {
                    color = 'green';
                    state = 'valid'
                }
                else{
                    
                    color = 'volcano';
                    state = 'not valid'
                }
                return (
                  <Tag color={color} key={tag}>
                    {state.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
                
                <Button type="primary" danger onClick = {()=> deleteCoupon(record.id)}> Delete </Button>
            </Space>
          ),
        },
      ];
      
      const couponsdata = coupons.map( (coupon,index)=> {

            
            return {

                key: index,
                id: coupon.id,
                name: coupon.coupon_name,
                discount: coupon.discount_percentage,
                expiration_date: moment(coupon.expiration_date).format('MMMM Do YYYY'),
                tags: [coupon.expiration_date]
            }


        })



        return (



            <Table columns={columns} dataSource={couponsdata} />




        )










}



export default CouponPanelComponent