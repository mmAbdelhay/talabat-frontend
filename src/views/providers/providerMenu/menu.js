import React from 'react';
import { withRouter  } from 'react-router-dom';

import "antd/dist/antd.css";
import axios from "axios";
import { ServerIP } from "../../../assets/config";
import { Collapse } from 'antd';
import { Form, Select, Button,Space, message   } from 'antd';
import ErrorPage from "../../sharedComponents/ErrorPages/ErrorPage";

const { Panel } = Collapse;

class MenuEdit extends React.Component{

  constructor(props){
      super(props);
      this.routeChange = this.routeChange.bind(this);
      this.state={
        token:localStorage.getItem("token"),
        categories:[],
        categoryID:"",
        items:[],
        itemID:"",
        itemOptions:[],
        itemOptionID:"",
        openCollapse:0,
        itemAdditionalOptions:[],
        itemAdditionalOptionID:"",
        error:"",
      };
  }

    async componentDidMount() {
        this.getCategories();
    }

    getCategories=async ()=>{
        const response = await axios.get(`${ServerIP}/api/v1/provider/categories/getall`, {
            headers:{
                Authorization: `Token ${this.state.token}`,
            }
        }).then((res) => {
     

            console.log('in then',res)
      
            this.setState({
                categories:res.data,
            },()=>console.log(this.state.categories))
          })
          .catch((err) => {
            console.log('in catch',err)
            if (err.response)
              this.setState({error: err.response.status})
            else 
            this.setState({error: 500})    
          });;

        
    }

    getCategoryItems =async (value)=>{
        console.log("in report",value);
        const response = await axios.get(`${ServerIP}/api/v1/provider/items/getcategoryitems/${value}`, {
            headers:{
                Authorization: `Token ${this.state.token}`,
            }
        });
        this.setState({
            items:response.data,
        },()=>console.log(this.state.items))
    }

    getItemOptions =async (value)=>{
        console.log("in ge titem options",value);
        const response = await axios.get(`${ServerIP}/api/v1/provider/itemoptions/getitemoptions/${value}`, {
            headers:{
                Authorization: `Token ${this.state.token}`,
            }
        });
        this.setState({
            itemOptions:response.data,
        },()=>console.log(this.state.items))
    }

    getAdditionalOptions =async (value)=>{
        console.log("in get additional options",value);
        const response = await axios.get(`${ServerIP}/api/v1/provider/itemadditionaloptions/getadditionaloptions/${value}`, {
            headers:{
                Authorization: `Token ${this.state.token}`,
            }
        });
        this.setState({
            itemAdditionalOptions:response.data,
        },()=>console.log(this.state.items))
    }

  setIDs=(value,key_name)=>{
    this.setState({
        [key_name]:value
    },()=>console.log(this.state.categoryID))
    if(key_name=="categoryID"){
        this.getCategoryItems(value);
    }else if(key_name=="itemID"){
        this.getItemOptions(value);
    }else if(key_name=="itemOptionID"){
        this.getAdditionalOptions(value);
    }
  };

  Delete=async()=>{
      console.log("category ID",this.state.categoryID);
      console.log("item ID",this.state.itemID);
      let axios_Link="";
      if(this.state.openCollapse==1){
        axios_Link = `${ ServerIP }/api/v1/provider/categories/delete/${this.state.categoryID}`;
      }else if(this.state.openCollapse==2){
        axios_Link = `${ ServerIP }/api/v1/provider/items/delete/${this.state.itemID}`;
      }else if(this.state.openCollapse==3){
        axios_Link = `${ ServerIP }/api/v1/provider/itemoptions/delete/${this.state.itemOptionID}`;
      }else if(this.state.openCollapse==4){
        axios_Link = `${ ServerIP }/api/v1/provider/itemadditionaloptions/delete/${this.state.itemAdditionalOptionID}`;
      }
      console.log("axios link",axios_Link);
      await axios.delete(`${ axios_Link }`,{
        headers: {
            'Authorization': `Token ${this.state.token}`
        }
        },{}).then((res) => {
            message.success(`${res.data['Message']}`);
            this.setState({
                categories:[],
                categoryID:"",
                items:[],
                itemID:"",
                itemOptions:[],
                itemOptionID:"",
                itemAdditionalOptions:[],
                itemAdditionalOptionID:""
            })
          }).catch((err)=>{
                message.error("Please select what u want to delete");
                if (err.response)
                this.setState({error: err.response.status})
                else 
                this.setState({error: 500}) 
                
                console.log('this is error status',this.state.error)
        });
        

  }

  Edit =()=>{
    console.log("category ID",this.state.categoryID);
    console.log("item ID",this.state.itemID);
    let axios_Link="";    
    if(this.state.openCollapse==1){
      axios_Link = `${ ServerIP }/api/v1/provider/categories/edit/${this.state.categoryID}`;
    }else if(this.state.openCollapse==2){
      axios_Link = `${ ServerIP }/api/v1/provider/items/edit/${this.state.itemID}`;
    }else if(this.state.openCollapse==3){
      axios_Link = `${ ServerIP }/api/v1/provider/itemoptions/edit/${this.state.itemOptionID}`;
    }else if(this.state.openCollapse==4){
      axios_Link = `${ ServerIP }/api/v1/provider/itemadditionaloptions/edit/${this.state.itemAdditionalOptionID}`;
    }
    console.log("axios link",axios_Link);
    axios.put(`${ axios_Link }`,{
      headers: {
          'Authorization': `Token ${this.state.token}`
      }
      },{}).catch((error)=>{
          alert(error);
      });
}




routeChange(edittype) {
    console.log(edittype);

    let path = ''
    switch(edittype) {
        case 'category':
            path = `/editcategory/${this.state.categoryID}`;
            this.props.history.push(path);
          break;
        case 'item':
             path = `/edititem/${this.state.itemID}`;
            this.props.history.push(path);     
          break;
        
        case 'itemoption':
            path = `/edititemoption/${this.state.itemOptionID}`;
            this.props.history.push(path);     
          break;

        case 'additionaloption':
            
            path = `/editadditionaloption/${this.state.itemAdditionalOptionID}`;
            this.props.history.push(path);   
          break;
          
          
              
          
       
      }
    this.props.history.push(path);
  }



    



  callback=(key)=>{
    console.log(key);
    this.setState({
        openCollapse:key,
        categoryID:"",
        items:[],
        itemID:"",
        itemOptions:[],
        itemOptionID:"",
        itemAdditionalOptions:[],
        itemAdditionalOptionID:""
    },()=>console.log(this.state.openCollapse))
  } 


  render(){ 
    if(this.state.categories.length>0 && !(this.state.error)){
    return (
      <div className="container">
        <div className="row">
            <div className="col"></div>
            <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
            <h2>Menu Admin Panel</h2><hr/>
            <Collapse defaultActiveKey={['1']} accordion onChange={this.callback}>
                
                <Panel header="Categories" key="1">
                    <Form>
                        <Form.Item label="Category" style={{marginTop:"20px"}}>
                            <Select onChange={(value)=>this.setIDs(value,"categoryID")}>
                            {this.state.categories.map(category=>{
                                return(
                                <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                                )
                            })}
                            </Select>
                            
                        </Form.Item>
                       
                        <Space>
                            <Button type="primary" danger  onClick={this.Delete}>
                                    Delete
                            </Button>
                            <Button type="primary"   onClick={()=>this.routeChange('category')}>
                                    Edit
                            </Button>

                           
                        </Space>
                    </Form>
                </Panel>

                <Panel header="Items" key="2">
                    <Form>
                        <Form.Item label="Category" style={{marginTop:"20px"}}>
                            <Select onChange={(value)=>this.setIDs(value,"categoryID")}>
                            {this.state.categories.map(category=>{
                                return(
                                <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                                )
                            })}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Item" name="item_id">
                            <Select onChange={(value)=>this.setIDs(value,"itemID")}>
                            {this.state.items.map(item=>{
                                return(
                                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                )
                            })}
                            </Select>
                        </Form.Item>
                        <Space>
                            <Button type="primary" danger  onClick={this.Delete}>
                                    Delete
                            </Button>
                            <Button type="primary"   onClick={()=>this.routeChange('item')}>
                                    Edit
                            </Button>

                           
                        </Space>
                    </Form>
                </Panel>
                
                <Panel header="Item Option Sections" key="3">
                    <Form>
                        <Form.Item label="Category" style={{marginTop:"20px"}}>
                            <Select onChange={(value)=>this.setIDs(value,"categoryID")}>
                            {this.state.categories.map(category=>{
                                return(
                                <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                                )
                            })}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Item" name="item_id">
                            <Select onChange={(value)=>this.setIDs(value,"itemID")}>
                            {this.state.items.map(item=>{
                                return(
                                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                )
                            })}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Item Option" name="item_option_id">
                            <Select onChange={(value)=>this.setIDs(value,"itemOptionID")}>
                            {this.state.itemOptions.map(item_option=>{
                                console.log("item option",item_option);
                                return(
                                <Select.Option key={item_option.id} value={item_option.id}>{item_option.section_name}</Select.Option>
                                )
                            })}
                            </Select>
                        </Form.Item>
                        <Space>
                            <Button type="primary" danger  onClick={this.Delete}>
                                    Delete
                            </Button>
                            <Button type="primary"   onClick={()=>this.routeChange('itemoption')}>
                                    Edit
                            </Button>

                           
                        </Space>
                    </Form>
                </Panel>
                
                <Panel header="Item Option" key="4">
                    <Form>
                        <Form.Item label="Category" style={{marginTop:"20px"}}>
                            <Select onChange={(value)=>this.setIDs(value,"categoryID")}>
                            {this.state.categories.map(category=>{
                                return(
                                <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                                )
                            })}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Item" >
                            <Select onChange={(value)=>this.setIDs(value,"itemID")}>
                            {this.state.items.map(item=>{
                                return(
                                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                )
                            })}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Item Option">
                            <Select onChange={(value)=>this.setIDs(value,"itemOptionID")}>
                            {this.state.itemOptions.map(item_option=>{
                                console.log("item option",item_option);
                                return(
                                <Select.Option key={item_option.id} value={item_option.id}>{item_option.section_name}</Select.Option>
                                )
                            })}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Item Additional Option" >
                            <Select onChange={(value)=>this.setIDs(value,"itemAdditionalOptionID")}>
                            {this.state.itemAdditionalOptions.map(item_additional_option=>{
                                return(
                                <Select.Option key={item_additional_option.id} value={item_additional_option.id}>{item_additional_option.option_name}</Select.Option>
                                )
                            })}
                            </Select>
                        </Form.Item>
                        <Space>
                            <Button type="primary" danger  onClick={this.Delete}>
                                    Delete
                            </Button>
                            <Button type="primary"   onClick={()=>this.routeChange('additionaloption')}>
                                    Edit
                            </Button>

                           
                        </Space>
                    </Form>
                </Panel>

            </Collapse>

            </div>
            <div className="col"></div>
        </div>
      </div>
    )}
    ;

    if(this.state.error){
        console.log('not hello')

        return( <ErrorPage err={`${this.state.error}`} />)

      }

      return false


    }
}

export default withRouter(MenuEdit);