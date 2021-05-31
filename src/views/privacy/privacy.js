import React, { Component } from "react";
import { Collapse, Space } from 'antd';
import  Accordion  from '../partials/accordion'
import {viewPanel} from './policy'
const { Panel } = Collapse;



function callback(key) {
  console.log(key);
}

// const text1 = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;

const Privacy = () => {


    return(

        <div className="container">
            <div className="row">
                <div className="col"></div>
      
      
      
                <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
                    <h2>Privacy Policy</h2><hr/>
                        
                        {viewPanel.map((vp,index) =>
                        
                        
                             <Accordion key={index} index={index} callback = {callback} text={vp.text} header={vp.header}/>
                        )}
                      
                       
                     
                   



                                    






                </div>


                <div className="col"></div>

            </div>
        </div>
    )
}

export default Privacy