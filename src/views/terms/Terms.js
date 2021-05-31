import React, { Component } from "react";
import { Collapse, Space } from 'antd';
import  Accordion  from '../partials/accordion'
import {viewTerms} from './tnq'
const { Panel } = Collapse;



function callback(key) {
  console.log(key);
}


const Terms = () => {


    return(

        <div className="container">
            <div className="row">
                <div className="col"></div>
      
      
      
                <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
                    <h2>Terms and Conditions</h2><hr/>
                        
                        {viewTerms.map((vp,index) =>
                        
                        
                             <Accordion key={index} index={index} callback = {callback} text={vp.text} header={vp.header}/>
                        )}
                      
                       
                     
                   



                                    






                </div>


                <div className="col"></div>

            </div>
        </div>
    )
}

export default Terms