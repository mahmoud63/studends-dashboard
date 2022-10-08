/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { DropdownButton, Dropdown, Modal } from "react-bootstrap";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);

  const [unit, setunit] = useState({
    name: "",
    year: "",
  });

  const [year, setYear] = useState({
    id: 0,
    name: "",
    color: "123",
  });

  const [year_, setYear_] = useState({
    id: 0,
    name: "",
    color: "123",
  });

  const [show, setShow] = useState(false);
  const [show_, setShow_] = useState(false);

  const handleClose = () => setShow(false);

  const handleClose_ = () => setShow_(false);
  useEffect(() => {
    getyears();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("yearId");
  }, []);

  const getyears = () => {
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/year/`,
    }).then((result) => {
      let da = result.data.years.reverse();

      console.log(da);
      setYears([]);
      setYears(da);
    });
  };

  const delet = (id) => {
    axios({
      method: "delete",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/year/`,
      data: { id: id },
    }).then((result) => {
      getyears();
    });
  };

  const add = (e) => {
    axios({
      method: "post",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/year/`,
      data: { ...year },
    }).then((result) => {
      getyears();
      handleClose();
      handleClose_();
      setYear({ id: 0, name: "", color: "123" });
      setYear_({ id: 0, name: "", color: "123" });
    });
  };

  const put = (e) => {
    axios({
      method: "put",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/year/`,
      data: year_,
    }).then((result) => {
      setShow_(false);
      getyears();
      handleClose();
      handleClose_();
      setYear({ id: 0, name: "", color: "123" });
      setYear_({ id: 0, name: "", color: "123" });
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ width: "100%" }}>
        <MaterialTable
          style={{ backgroundColor: "#eff2f5" }}
          title="سنوات دراسيه"
          columns={[
            { title: "الاسم", field: "name" },
            { title: "الهاتف", field: "phone" },
            { title: "البريد الالكتروني", field: "email" },
            {
              title: "الجاله",
              field: "Active",
              lookup: { true: "مفعل", false: "غير مفعل", null: "غير مفعل" },
            },
          ]}
          data={years}
          actions={[
            {
              icon: "edit",
              tooltip: "Save User",
              onClick: (event, rowData) => {
                setYear_({ ...rowData });
                setShow_(true);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete User",
              onClick: (event, rowData) => delet(rowData.id),
            },

            {
              icon: "add",
              tooltip: "Add User",
              isFreeAction: true,
              onClick: (event) => setShow(true),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            exportButton: true,
            pageSize: 13,
            headerStyle: { display: "none" },
          }}
        />

        <Dialog open={show} onClose={handleClose}>
          <DialogTitle>اضافة سنه دراسيه</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="اسم "
              name="name"
              aria-describedby="emailHelp"
              value={year.name}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setYear({ ...year, name: e.target.value });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(e) => {
                handleClose();
                add();
              }}
            >
              حفظ
            </Button>
            <Button variant="primary" onClick={handleClose}>
              رجوع
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={show_} onClose={handleClose_}>
          <DialogTitle>تعديل سنه دراسيه</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="اسم السنه"
              name="name"
              aria-describedby="emailHelp"
              value={year_.name}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setYear_({ ...year_, name: e.target.value });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(e) => {
                handleClose();
                put();
              }}
            >
              حفظ
            </Button>
            <Button variant="primary" onClick={handleClose}>
              رجوع
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

// Data

function Tables() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}></MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}
