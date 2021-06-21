import React from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { ServerIP } from "../../assets/config";
import axios from "axios";
import { message } from "antd";

const Feedback = () => {

const [experience, setExperience] = useState('')
const [effort, setEffort] = useState('')
const [recommend, setRecommend] = useState('')
const [text, setText] = useState('')

let feed = {}

const submitFeedback = async (e) => {
    e.preventDefault()

    feed = {experience: experience, effort: effort, recommend: recommend,text: text }

    console.log(feed);

    // let res = await fetch('http://localhost:5000/api/v1/feedback',{

    //     method: 'POST',
    //     headers:{"Content-Type" : "application/json"},
    //     body:JSON.stringify(feed)


    // })


    axios
    .post(`${ServerIP}/api/v1/feedback`, feed,)
    .then((res) => {
      message.success("your feedback sent successfully");
      window.location.href = "/";
    })
    .catch((err) => {
        if(err.response)
            message.error(err);
        else
            message.error('server is down')
      console.log(err);
    });
    

    console.log(JSON.stringify(feed))






}

return (

   
<div className="container">
  <div className="row">
    <div className="col"></div>



    <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
        <h2>Feedback</h2><hr/>

        <Form >
            <p className="h6">How would you rate your overall Talabat.com experience?</p>
            <Form.Group >
            <div className="btn-group btn-group-toggle col-11 p-3" data-toggle="buttons">
                <label className="btn btn-outline-danger ">
                    <input type="radio" name="options" id="option1" value="Not at all Satisfied" onClick = {(e) => setExperience(e.target.value)}/> Not at all Satisfied
                </label>
                <label className="btn btn-outline-warning">
                    <input type="radio" name="options" id="option2" value="Slightly Satisfied" onClick = {(e) => setExperience(e.target.value)} /> Slightly Satisfied
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option3" value="Moderately Satisfied" onClick = {(e) => setExperience(e.target.value)} /> Moderately Satisfied
                </label>
                <label className="btn btn-outline-primary">
                    <input type="radio" name="options" id="option4" value="Quite Satisfied "  onClick = {(e) => setExperience(e.target.value)} /> Quite Satisfied 
                </label>
                <label className="btn btn-outline-success">
                    <input type="radio" name="options" id="option5" value="Extremely Satisfied " onClick = {(e) => setExperience(e.target.value)} /> Extremely Satisfied
                </label>
            </div>
              

            </Form.Group>
            <hr></hr>

            <p  className="h6">How much effort did you personally have to put forth to get your service done?</p>
            <Form.Group >
            <div className="btn-group btn-group-toggle col-11 p-3" data-toggle="buttons">
                <label className="btn btn-outline-secondary ">
                    <input type="radio" name="options" id="option1" value="1" onClick = {(e) => setEffort(e.target.value)}/> 1
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option2" value="2" onClick = {(e) => setEffort(e.target.value)} /> 2
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option3" value="3" onClick = {(e) => setEffort(e.target.value)} /> 3
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option3" value="4" onClick = {(e) => setEffort(e.target.value)} /> 4
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option3" value="5" onClick = {(e) => setEffort(e.target.value)} /> 5
                </label>
            </div>
            <div className="d-block col-11">

                <span className=" text-success">Very low effort</span>
                <span className="pl-3 text-danger float-right">Very high effort</span>


            </div>
           
            
              

            </Form.Group>
            <hr></hr>


            
            <p  className="h6">How likely are you to recommend Talabat.com to friend, family or colleagues?</p>
            <Form.Group >
            <div className="btn-group btn-group-toggle col-11 p-3" data-toggle="buttons">
                <label className="btn btn-outline-secondary ">
                    <input type="radio" name="options" id="option1" value="1" onClick = {(e) => setRecommend(e.target.value)}/> 1
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option2" value="2" onClick = {(e) => setRecommend(e.target.value)} /> 2
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option3" value="3" onClick = {(e) => setRecommend(e.target.value)} /> 3
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option3" value="4" onClick = {(e) => setRecommend(e.target.value)} /> 4
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option3" value="5" onClick = {(e) => setRecommend(e.target.value)} /> 5
                </label>
                <label className="btn btn-outline-secondary ">
                    <input type="radio" name="options" id="option1" value="6" onClick = {(e) => setRecommend(e.target.value)}/> 6
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option2" value="7" onClick = {(e) => setRecommend(e.target.value)} /> 7
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option3" value="8" onClick = {(e) => setRecommend(e.target.value)} /> 8
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option3" value="9" onClick = {(e) => setRecommend(e.target.value)} /> 9
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option3" value="10" onClick = {(e) => setRecommend(e.target.value)} /> 10
                </label>
            </div>
            <div className="d-block col-11">

                <span className=" text-danger">Not at all likely</span>
                <span className="pl-3 text-success float-right">Extremly likely</span>


            </div>
              

            </Form.Group>
            <hr></hr>
            <p className="h6">Please provide any other feedback on your Talabat.com experience.</p>
           <Form.Group>
                <textarea className="form-control col-11 p-3" id="exampleFormControlTextarea1" rows="4" onChange={(e)=>setText(e.target.value)}></textarea>
           </Form.Group>
           <hr></hr>
           
            <button type="submit" className="btn btn-success" onClick = {submitFeedback}>Submit your feedback</button>
        </Form>
    </div>


    


    <div className="col "></div>
  </div>
</div>


   


)


}


export default Feedback