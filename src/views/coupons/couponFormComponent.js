import { Form, Input, Button, DatePicker, InputNumber} from 'antd';

    
    const layout = {
        labelCol: {
          span: 0,
        },
        wrapperCol: {
          span: 12,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 0,
          span: 10,
        },
      };
      
      const Demo = ({addcoupon}) => {
        const onFinish = (values) => {
          console.log('Success:', values);
          addcoupon(values);
        };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };


        const disabledDate = (current) => {
          // Can not select days before today and today

          console.log('this is current',current)

          return current < Date.now();
        }
      
        return (
          <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Coupon Name"
              name="coupon_name"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            
            
            <Form.Item label="discount" name = "discount_percentage"
            rules={[
                {
                  required: true,
                  type: 'number',
                  message: 'Please input coupon discount percentage!',
                },
              ]}
            >
                <InputNumber />
            </Form.Item>
            
            <Form.Item label="expiration date"  name = "expiration_date"
            rules={[
                {
                  required: true,
                  message: 'Please input coupon expiration date!',
                },
              ]}>
                <DatePicker 
                 
                 disabledDate={disabledDate}
                
                />
            </Form.Item>
            
      
      
      
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        );
      };


export default Demo;