import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { ServerIP } from "../../assets/config";
import { Link } from "react-router-dom";
import { Button } from "antd";
import ErrorPage from "../sharedComponents/ErrorPages/ErrorPage";



const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Email",
    selector: "email",
    sortable: true,
  },
  {
    name: "Mobile",
    selector: "mobile",
    sortable: true,
  },
  {
    name: "Last Lat",
    selector: "last_latitude",
    sortable: true,
  },
  {
    name: "Last Long",
    selector: "last_longitude",
    sortable: true,
  },
  {
    name: "Work status",
    selector: "work_state",
    sortable: true,
  },
];

export default function AllDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState("");

  const allDrivers = async () => {
    let response = await axios.get(
      `${ServerIP}/api/v1/superuser/get/alldrivers`,
      {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      }
    ).then((res)=>{
      if (res.status === 200) {
        setDrivers(res.data?.Responses);
      }

    }).catch((err) => {
      if (err.response)
        setError(err.response.status)
      else 
        setError(500)
    
    });
    
  };

  useEffect(() => {
    allDrivers();
    console.log(drivers);
  }, []);



  if(drivers.length>0){

  return (
    <div className="container">
      <DataTable title="All Drivers" columns={columns} data={drivers} />
      <Link to="/">
        <Button type="primary" style={{ float: "right", margin: "10px" }}>
          go back
        </Button>
      </Link>
    </div>
  );

  }


  if (error){
    return( <ErrorPage err={`${error}`} />)
   }



   return false



}
