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

  const [year, setYear] = useState(0);

  const [student, setStudent] = useState({
    id: 0,
    name: "",
    email: "",
    phone: "",
    password: "",
    active: "",
    year: "",
  });

  const [studentـ, setStudentـ] = useState({
    id: 0,
    name: "",
    email: "",
    phone: "",
    password: "",
    active: "",
    year: "",
  });

  const [show, setShow] = useState(false);
  const [show_, setShow_] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose_ = () => setShow_(false);
  const handleShow_ = () => setShow_(true);
  useEffect(() => {
    getdata();
    getyears();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("yearId");
  }, []);

  const getdata = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("yearId");
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://students-01.herokuapp.com/api/student/${id || -1}`,
    }).then((result) => {
      let da = result.data.students;

      console.log(da);
      setData([]);
      setData(da);
    });
  };

  const getyears = () => {
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://students-01.herokuapp.com/api/year/`,
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
      url: `https://students-01.herokuapp.com/api/student/`,
      data: { id: id },
    }).then((result) => {
      getdata();
    });
  };

  const activate = (id, activate) => {
    axios({
      method: "post",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://students-01.herokuapp.com/api/student/activate`,
      data: { id: id },
    }).then((result) => {
      getdata();
    });
  };

  const deactivate = (id, activate) => {
    axios({
      method: "post",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://students-01.herokuapp.com/api/student/deactivate`,
      data: { id: id },
    }).then((result) => {
      getdata();
    });
  };

  const add = (e) => {
    axios({
      method: "post",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://students-01.herokuapp.com/api/student/`,
      data: { ...student },
    }).then((result) => {
      getdata();
    });
  };

  const put = (e) => {
    axios({
      method: "put",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://students-01.herokuapp.com/api/student/`,
      data: studentـ,
    }).then((result) => {
      setShow_(false);
      getdata();
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ width: "100%" }}>
        <MaterialTable
          style={{ backgroundColor: "#eff2f5" }}
          title="الطلاب"
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
          data={data}
          actions={[
            {
              icon: "edit",
              tooltip: "Save User",
              onClick: (event, rowData) => {
                setStudentـ({ ...rowData });
                setShow_(true);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete User",
              onClick: (event, rowData) => delet(rowData.id),
            },
            {
              icon: "check",
              tooltip: "Activate User",
              onClick: (event, rowData) => activate(rowData.id),
            },
            {
              icon: "clear",
              tooltip: "deactivate User",

              onClick: (event, rowData) => deactivate(rowData.id),
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
            pageSize: 20,
            headerStyle: { display: "none" },
          }}
        />

        <Dialog open={show} onClose={handleClose}>
          <DialogTitle>اضافة طالب</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="اسم الطالب"
              name="name"
              aria-describedby="emailHelp"
              value={student.name}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setStudent({ ...student, name: e.target.value });
              }}
            />

            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="هاتف الطالب"
              name="phone"
              aria-describedby="emailHelp"
              value={student.phone}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                setStudent({ ...student, phone: e.target.value });
              }}
            />

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="ايميل الطالب"
              name="email"
              aria-describedby="emailHelp"
              value={student.email}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                setStudent({ ...student, email: e.target.value });
              }}
            />

            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="باسورد الطالب"
              name="password"
              aria-describedby="emailHelp"
              value={student.password}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                setStudent({ ...student, password: e.target.value });
              }}
            />

            <form class=" ml-5 mr-5 w-20 ext-right" onSubmit={add}>
              <div class="form-group w-20 fmgp">
                <label for="exampleInputEmail1">اسم المرحله</label>
                <select
                  class="form-control"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setStudent({ ...student, year: e.target.value });
                  }}
                >
                  <option selected disabled>
                    اختار المرحلة التعليمية
                  </option>
                  {years.map((year) => (
                    <option value={year.id}>{year.name}</option>
                  ))}
                </select>
              </div>
            </form>
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
          <DialogTitle>تعديل طالب</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="اسم الطالب"
              name="name"
              aria-describedby="emailHelp"
              value={studentـ.name}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setStudent_({ ...studentـ, name: e.target.value });
              }}
            />

            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="هاتف الطالب"
              name="phone"
              aria-describedby="emailHelp"
              value={studentـ.phone}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                setStudent_({ ...studentـ, phone: e.target.value });
              }}
            />

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="ايميل الطالب"
              name="email"
              aria-describedby="emailHelp"
              value={studentـ.email}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                setStudent_({ ...studentـ, email: e.target.value });
              }}
            />

            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="باسورد الطالب"
              name="password"
              aria-describedby="emailHelp"
              value={studentـ.password}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                setStudent_({ ...studentـ, password: e.target.value });
              }}
            />

            <form class=" ml-5 mr-5 w-20 ext-right" onSubmit={add}>
              <div class="form-group w-20 fmgp">
                <label for="exampleInputEmail1">اسم المرحله</label>
                <select
                  class="form-control"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setStudent_({ ...studentـ, year: e.target.value });
                  }}
                >
                  <option selected disabled>
                    اختار المرحلة التعليمية
                  </option>
                  {years.map((year) => (
                    <option value={year.id}>{year.name}</option>
                  ))}
                </select>
              </div>
            </form>
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

        {/* <Modal show={show_} onHide={handleClose_}>
          <Modal.Body>
            <div className="card-header text-white">
              <h6>تعديل الطالب</h6>
            </div>
            <form class=" ml-5 mr-5 w-20 ext-right" onSubmit={add}>
              <div class="form-group w-20 fmgp">
                <label for="exampleInputEmail1">اسم الطالب</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  name="name"
                  aria-describedby="emailHelp"
                  width="75%"
                  value={studentـ.name}
                  onChange={(e) => {
                    e.preventDefault();
                    setStudentـ({ ...studentـ, name: e.target.value });
                  }}
                />
              </div>
              <div class="form-group w-20 fmgp">
                <label for="exampleInputEmail1">هاتف الطالب</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  name="phone"
                  aria-describedby="emailHelp"
                  width="75%"
                  value={studentـ.phone}
                  onChange={(e) => {
                    e.preventDefault();
                    setStudentـ({ ...studentـ, phone: e.target.value });
                  }}
                />
              </div>
              <div class="form-group w-20 fmgp">
                <label for="exampleInputEmail1">ايميل الطالب</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  width="75%"
                  value={studentـ.email}
                  onChange={(e) => {
                    e.preventDefault();
                    setStudentـ({ ...studentـ, email: e.target.value });
                  }}
                />
              </div>
              <div class="form-group w-20 fmgp">
                <label for="exampleInputEmail1">باسورد الطالب</label>
                <input
                  type="text"
                  name="password"
                  class="form-control"
                  aria-describedby="emailHelp"
                  width="75%"
                  value={studentـ.password}
                  onChange={(e) => {
                    e.preventDefault();
                    setStudentـ({ ...studentـ, password: e.target.value });
                  }}
                />
              </div>
              <div class="form-group w-20 fmgp">
                <label for="exampleInputEmail1">اسم المرحله</label>
                <select
                  class="form-control"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setStudentـ({ ...studentـ, year: e.target.value });
                  }}
                >
                  <option selected disabled>
                    اختار المرحلة التعليمية
                  </option>
                  {years.map((year) => (
                    <option value={year.id}>{year.name}</option>
                  ))}
                </select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
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
          </Modal.Footer>
        </Modal> */}
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
