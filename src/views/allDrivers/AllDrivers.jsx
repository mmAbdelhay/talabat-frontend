import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { ServerIP } from "../../assets/config";
import { Link } from "react-router-dom";
import { Button } from "antd";

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
  const allDrivers = async () => {
    let response = await axios.get(
      `${ServerIP}/api/v1/superuser/get/alldrivers`,
      {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      }
    );
    if (response.status === 200) {
      setDrivers(response.data?.Responses);
    } else {
      return false;
    }
  };

  useEffect(() => {
    allDrivers();
    console.log(drivers);
  }, []);

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
