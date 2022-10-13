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

import AWS from "aws-sdk";

const Dashboard = () => {
  const spacesEndpoint = new AWS.Endpoint("fra1.digitaloceanspaces.com");
  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: "DO00XDWBZE37C6G4MWE2",
    secretAccessKey: "TOMZ7v67kNc0bJfNPwJ2/YaJJExkLD0zR7ojM72iim4",
  });
  const [sliders, setSliders] = useState([]);

  const [slider, setSlider] = useState({
    id: 0,
    name: "",
    image: "",
  });

  const [slider_, setSlider_] = useState({
    id: 0,
    name: "",
    image: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [show_, setShow_] = useState(false);

  const handleClose_ = () => setShow_(false);
  useEffect(() => {
    getsliders();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("sliderId");
  }, []);

  const getsliders = () => {
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/slider/`,
    }).then((result) => {
      let da = result.data.sliders.reverse();

      console.log(da);
      setSliders([]);
      setSliders(da);
    });
  };

  const delet = (id) => {
    axios({
      method: "delete",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/slider/`,
      data: { id: id },
    }).then((result) => {
      getsliders();
    });
  };

  const add = (e) => {
    axios({
      method: "post",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/slider/`,
      data: { ...slider },
    }).then((result) => {
      getsliders();
      setSlider({
        name: "",
        image: "",
      });
    });
  };

  const put = (e) => {
    axios({
      method: "put",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/slider/`,
      data: slider_,
    }).then((result) => {
      setShow_(false);
      getsliders();
      setSlider({
        id: 0,
        name: "",
        image: "",
      });
    });
  };

  const upload = (e) => {
    console.log("start");
    if (e.target.files && e.target.files[0]) {
      const blob = e.target.files[0];
      const imageName = new Date().getTime() + blob.name;
      const params = {
        Body: blob,
        Bucket: `student-unit-image`,
        Key: imageName,
        ACL: "public-read-write",
      }; // Sending the file to the Spaces
      s3.putObject(params)
        .on("build", (request) => {
          request.httpRequest.headers.Host =
            "http://student-unit-image.fra1.digitaloceanspaces.com";
          request.httpRequest.headers["Content-Length"] = blob.size;
          request.httpRequest.headers["Content-Type"] = blob.type;
          request.httpRequest.headers["x-amz-acl"] = "public-read";
          request.httpRequest.headers["Access-Control-Allow-Origin"] = "*";
        })
        .send((err) => {
          if (err) console.log(err);
          else {
            // If there is no error updating the editor with the imageUrl
            const imageUrl = "https://student-unit-image.fra1.digitaloceanspaces.com/" + imageName;
            console.log(imageUrl);
            setSlider({ ...slider, image: imageUrl });
          }
        });
    }
  };

  const upload_ = (e) => {
    console.log("start");
    if (e.target.files && e.target.files[0]) {
      const blob = e.target.files[0];
      const imageName = new Date().getTime() + blob.name;
      const params = {
        Body: blob,
        Bucket: `student-unit-image`,
        Key: imageName,
        ACL: "public-read-write",
      }; // Sending the file to the Spaces
      s3.putObject(params)
        .on("build", (request) => {
          request.httpRequest.headers.Host =
            "http://student-unit-image.fra1.digitaloceanspaces.com";
          request.httpRequest.headers["Content-Length"] = blob.size;
          request.httpRequest.headers["Content-Type"] = blob.type;
          request.httpRequest.headers["x-amz-acl"] = "public-read";
          request.httpRequest.headers["Access-Control-Allow-Origin"] = "*";
        })
        .send((err) => {
          if (err) console.log(err);
          else {
            // If there is no error updating the editor with the imageUrl
            const imageUrl = "https://student-unit-image.fra1.digitaloceanspaces.com/" + imageName;
            console.log(imageUrl);
            setSlider_({ ...slider_, image: imageUrl });
          }
        });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ width: "100%" }}>
        <MaterialTable
          style={{ backgroundColor: "#eff2f5" }}
          title="اعلانات"
          columns={[
            { title: "الاسم", field: "name" },
            {
              title: "البريد الالكتروني",
              field: "email",
              render: (data) => {
                // console.log(data, years);

                return (
                  <a target="_blank" href={data?.image}>
                    {data?.image.slice(0, 30)}
                  </a>
                );
              },
            },
          ]}
          data={sliders}
          actions={[
            {
              icon: "edit",
              tooltip: "Save User",
              onClick: (event, rowData) => {
                setSlider_({ ...rowData });
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
          <DialogTitle>اضافة اعلان </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="اسم "
              name="name"
              aria-describedby="emailHelp"
              value={slider.name}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setSlider({ ...slider, name: e.target.value });
              }}
            />
            <label for="images" class="drop-container">
              <input
                type="file"
                id="images"
                accept="image/*"
                title="اختار ملف"
                onChange={(e) => {
                  console.log(e.target.files);
                  console.log("------------");

                  upload(e);
                }}
              />
            </label>
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
          <DialogTitle>تعديل اعلان </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="اسم"
              name="name"
              aria-describedby="emailHelp"
              value={slider_.name}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setSlider_({ ...slider_, name: e.target.value });
              }}
            />
            <label for="images" class="drop-container">
              <input
                type="file"
                id="images"
                accept="image/*"
                title="اختار ملف"
                onChange={(e) => {
                  console.log(e.target.files);
                  console.log("------------");

                  upload_(e);
                }}
              />
            </label>
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
