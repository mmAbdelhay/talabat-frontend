import React from "react";
import { Result } from "antd";


export default function ErrorPage(props) {

  
    if (props.err === '500'){
      return (
        <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
      />
      )
    }
    
  
  if (props.err === '401'){
    return (
      <Result
      status="403"
      title="401"
      subTitle="Sorry, you are not authorized to access this page."
    />
    )
  }
  if (props.err === '404'){
    return (
      <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />
    )
    }
    return null
  
}
