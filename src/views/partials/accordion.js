import React, { Component } from "react";
import { Collapse, Space } from 'antd';

const { Panel } = Collapse;


const Accordion = ({callback, text, header, index}) => {


    return(
        <div>


                <Collapse onChange={callback}>
                    <Panel header= { header} key={index}>
                        <p>{text}</p>
                    </Panel>
                </Collapse>

                <br></br>

                {/* <Collapse  onChange={callback}>
                    <Panel header="This is panel header 1" key="1">
                        <p>{text}</p>
                    </Panel>
                </Collapse> */}
        </div>
    )
}

export default Accordion