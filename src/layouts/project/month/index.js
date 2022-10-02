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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import AWS from "aws-sdk";

const Dashboard = () => {
  const spacesEndpoint = new AWS.Endpoint("fra1.digitaloceanspaces.com");
  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: "DO00XDWBZE37C6G4MWE2",
    secretAccessKey: "TOMZ7v67kNc0bJfNPwJ2/YaJJExkLD0zR7ojM72iim4",
  });

  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);

  const [unit, setUnit] = useState({
    name: "",
    image: "",
    year: "",
    disc: "",
  });

  const [unitـ, setUnitـ] = useState({
    id: 0,
    name: "",
    image: "",
    year: "",
    disc: "",
  });

  const [show, setShow] = useState(false);
  const [show_, setShow_] = useState(false);

  const handleClose = () => setShow(false);

  const handleClose_ = () => setShow_(false);
  useEffect(() => {
    getUnits();
    getyears();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("yearId");
  }, []);

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

  const getUnits = () => {
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://students-01.herokuapp.com/api/unit/-1`,
    }).then((result) => {
      let da = result.data.units.reverse();

      console.log(da);
      setData([]);
      setData(da);
    });
  };

  const delet = (id) => {
    axios({
      method: "delete",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://students-01.herokuapp.com/api/unit/`,
      data: { id: id },
    }).then((result) => {
      getUnits();
    });
  };

  const add = (e) => {
    axios({
      method: "post",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://students-01.herokuapp.com/api/unit/`,
      data: { ...unit },
    }).then((result) => {
      getUnits();
    });
  };

  const put = (e) => {
    axios({
      method: "put",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://students-01.herokuapp.com/api/unit/`,
      data: unitـ,
    }).then((result) => {
      setShow_(false);
      getUnits();
    });
  };

  const upload = (e) => {
    console.log("start");
    if (e.target.files && e.target.files[0]) {
      const blob = e.target.files[0];
      const params = { Body: blob, Bucket: `student-unit-image`, Key: blob.name };
      // Sending the file to the Spaces
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
            const imageUrl = "https://student-unit-image.fra1.digitaloceanspaces.com" + blob.name;
            callback(imageUrl, blob.name);
          }
        });
    }
  };

  const upload_ = (e) => {
    if (e.target.files && e.target.files[0]) {
      const blob = e.target.files[0];
      const params = { Body: blob, Bucket: `student-unit-image`, Key: blob.name };
      // Sending the file to the Spaces
      s3.putObject(params)
        .on("build", (request) => {
          request.httpRequest.headers.Host =
            "https://student-unit-image.fra1.digitaloceanspaces.com";
          request.httpRequest.headers["Content-Length"] = blob.size;
          request.httpRequest.headers["Content-Type"] = blob.type;
          request.httpRequest.headers["x-amz-acl"] = "public-read";
        })
        .send((err) => {
          if (err) errorCallback();
          else {
            // If there is no error updating the editor with the imageUrl
            const imageUrl = "https://student-unit-image.fra1.digitaloceanspaces.com" + blob.name;
            callback(imageUrl, blob.name);
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
          title=" شهور"
          columns={[
            { title: "الاسم", field: "name" },
            { title: "الهاتف", field: "disc" },
            {
              title: "البريد الالكتروني",
              field: "email",
              render: (data) => {
                // console.log(data, years);
                let y = years.find((i) => data.yearId == i.id);

                return <p>{y?.name}</p>;
              },
            },
          ]}
          data={data}
          actions={[
            {
              icon: "edit",
              tooltip: "Save User",
              onClick: (event, rowData) => {
                setUnitـ({ ...rowData });
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
            pageSize: 20,
            headerStyle: { display: "none" },
          }}
        />

        <Dialog open={show} onClose={handleClose}>
          <DialogTitle>اضافة الشهر</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="اسم "
              name="name"
              aria-describedby="emailHelp"
              value={unit.name}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setUnit({ ...unit, name: e.target.value });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="وصف "
              name="desc"
              value={unit.disc}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setUnit({ ...unit, disc: e.target.value });
              }}
            />

            <div class="form-group w-20 fmgp">
              <input
                type="file"
                onChange={(e) => {
                  console.log(e.target.files);
                  console.log("------------");

                  upload(e);
                }}
              />
            </div>

            <label for="exampleInputEmail1">اسم المرحله</label>
            <select
              class="form-control"
              onChange={(e) => {
                console.log(e.target.value);
                setUnit({ ...unit, year: e.target.value });
              }}
            >
              <hr />

              <option selected disabled>
                اختار المرحلة التعليمية
              </option>
              {years.map((year) => (
                <option value={year.id}>{year.name}</option>
              ))}
            </select>
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
              value={unitـ.name}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setUnitـ({ ...unitـ, name: e.target.value });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="وصف "
              name="desc"
              value={unitـ.disc}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setUnitـ({ ...unitـ, disc: e.target.value });
              }}
            />

            <input
              type="file"
              style={{ fontSize: 18, display: "inline" }}
              onChange={(e) => {
                upload_(e);
              }}
            />
            <hr />
            <label for="exampleInputEmail1">اسم المرحله</label>
            <select
              class="form-control"
              onChange={(e) => {
                console.log(e.target.value);
                setUnitـ({ ...unitـ, year: e.target.value });
              }}
            >
              <option selected disabled>
                اختار المرحلة التعليمية
              </option>
              {years.map((year) => (
                <option value={year.id} selected={year.id == unitـ.year}>
                  {year.name}
                </option>
              ))}
            </select>
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
