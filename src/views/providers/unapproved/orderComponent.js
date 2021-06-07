import {  Table, Tag, Space  } from 'antd';
import {  Button  } from 'antd';


const OrderComponent = ({orders , updateOrderState, deleteOrder}) => {


    const columns = [
        {
          title: 'order ID',
          dataIndex: 'id',
          key: 'id',
          render: text => <a>{text}</a>,
          width: '25%'
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          width: '25%'
        },
        {
          title: 'Status',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <>
              {tags.map(tag => {
                let color;
                if (tag === 'Pending') {
                  color = 'volcano';
                }
                else if(tag === 'Preparing'){
                    color = 'geekblue';

                }
                else{
                    color = 'green';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
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
                
            
                {record.tags[0] === 'Pending' ? <Button type="primary" onClick={() => updateOrderState(record,'Preparing')}>Prepare</Button> : 
                
                (record.tags[0] === 'Preparing' ?  <Button type="primary" onClick={() => updateOrderState(record,'Ready')}>Ready</Button> : <></>)
                
                
                }

                
                
                <Button type="primary" danger onClick = {()=> deleteOrder(record.id)}> Delete </Button>
            </Space>
          ),
        },
      ];
      
      const ordersdata = orders.map( (order,index)=> {

            
            return {

                key: index,
                id: order.id,
                price: order.total_price,
                tags: [order.order_status]
            }


        })



        return (



            <Table columns={columns} dataSource={ordersdata} />




        )










}



export default OrderComponent