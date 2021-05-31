import React, { Component } from "react";
import { Collapse, Space } from 'antd';
import  Accordion  from '../partials/accordion'
import {viewFaq} from './questions'
const { Panel } = Collapse;



function callback(key) {
  console.log(key);
}


const FAQ = () => {


    return(

        <div className="container">
            <div className="row">
                <div className="col"></div>
      
      
      
                <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
                    <h2>Frequently Asked Questions (FAQ)</h2><hr/>
                        
                        {viewFaq.map((vp,index) =>
                        
                        
                             <Accordion key={index} index={index} callback = {callback} text={vp.text} header={vp.header}/>
                        )}
                      
                       
                     
                   



                                    






                </div>


                <div className="col"></div>

            </div>
        </div>
    )
}

export default FAQ