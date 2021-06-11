import React from 'react';
import "antd/dist/antd.css";
import axios from "axios";
import { ServerIP } from "../../../assets/config";
import { Form, Input, Button, Checkbox, InputNumber,Select , Steps, message } from 'antd';
import UploadLogoInput from "../../sharedComponents/FormInputs/UploadLogoInput";
import FirstStep from './firstStep';

const { Step } = Steps;

class AddItem extends React.Component{

  constructor(props){
      super(props);
      this.state={
        token:localStorage.getItem("token"),
        current:0,
      };
  }

  async componentDidMount() {
  }

  render(){
    const steps = [
        {
          title: 'First',
          content: 'First-content',
        },
        {
          title: 'Second',
          content: 'Second-content',
        },
        {
          title: 'Last',
          content: 'Last-content',
        },
    ];

        
    const next = (values,logoo) => {
        if (this.state.current==0){
            axios.post(`${ServerIP}/api/v1/provider/items/add`, 
            {
                name:values.name,
                logo:logoo,
                price:values.price,
                summary:values.summary,
                category_id:values.category_id
            },
            {headers: {
                Authorization: `Token ${this.state.token}`,
            }}
        );
        }
        console.log("in next");
        let newCurrent=this.state.current+1
        this.setState({current:newCurrent});
    };

    const prev = () => {
        let newCurrent=this.state.current-1
        this.setState({current:newCurrent});
    };

    return (

        <>
      <Steps current={this.state.current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{marginTop:"30px"}}>
            {this.state.current==0?<FirstStep next={next}/>:"asd"}
      </div>
      <div className="steps-action">
        {this.state.current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
        </>
        
    );
    }
}

export default AddItem;