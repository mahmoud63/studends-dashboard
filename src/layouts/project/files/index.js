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

const Tables = () => {
  const spacesEndpoint = new AWS.Endpoint("fra1.digitaloceanspaces.com");
  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: "DO00XDWBZE37C6G4MWE2",
    secretAccessKey: "TOMZ7v67kNc0bJfNPwJ2/YaJJExkLD0zR7ojM72iim4",
  });
  const [data, setData] = useState([]);
  const [units, setUnits] = useState([]);

  const [file, setFile] = useState({
    name: "",
    link: "",
    unitId: "",
  });

  const [enable, setEnable] = useState(true);

  const [file_, setFile_] = useState({
    id: 0,
    name: "",
    link: "",
    unitId: "",
  });
  const [show, setShow] = useState(false);
  const [show_, setShow_] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose_ = () => setShow_(false);

  const handleShow = () => setShow(true);

  useEffect(() => {
    getdata();
    getUnits();
  }, []);

  const getdata = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("unitId");
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/file/${id || -1}`,
    }).then((result) => {
      let da = result.data.files;

      console.log(da);
      setData([]);
      setData(da);
    });
  };

  const getUnits = () => {
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/unit/-1`,
    }).then((result) => {
      let da = result.data.units;

      console.log(da);

      setUnits([]);
      setUnits(da);
    });
  };

  const delet = (file) => {
    console.log(file);
    axios({
      method: "delete",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/file/`,
      data: { id: file },
    }).then((result) => {
      getdata();
    });
  };

  const add = (e) => {
    // e.preventDefault();

    console.log(file);
    axios({
      method: "post",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/file/`,
      data: { ...file },
    }).then((result) => {
      console.log(result);
      getdata();
      setFile({
        name: "",
        link: "",
        unitId: "",
      });
      setFile_({
        id: 0,
        name: "",
        link: "",
        unitId: "",
      });
      handleClose();
    });
  };

  const put = (e) => {
    axios({
      method: "put",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/file/`,
      data: { ...file_ },
    }).then((result) => {
      getdata();
      handleClose_();

      setFile({
        name: "",
        link: "",
        unitId: "",
      });
      setFile_({
        id: 0,
        name: "",
        link: "",
        unitId: "",
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
            setEnable(false);
            setFile({ ...file, link: imageUrl });
          }
        });
    }
  };

  const upload_ = (e) => {
    setEnable(true);

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
            setFile_({ ...file_, link: imageUrl });
            setEnable(false);
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
          title=" ملفات"
          columns={[
            { title: "الاسم", field: "name" },

            {
              title: "البريد الالكتروني",
              field: "email",
              render: (data) => {
                // console.log(data, years);

                return (
                  <a target="_blank" href={data?.link}>
                    {data?.link.slice(0, 30)}
                  </a>
                );
              },
            },
          ]}
          data={data}
          actions={[
            {
              icon: "edit",
              onClick: (event, rowData) => {
                setFile_({ ...rowData });
                setShow_(true);
                setEnable(false);
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
          <DialogTitle>اضافة فيديو</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="اسم "
              name="name"
              aria-describedby="emailHelp"
              value={file.name}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setFile({ ...file, name: e.target.value });
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

            <div class="select-dropdown">
              <select
                class="form-control"
                onChange={(e) => {
                  console.log(e.target.value);
                  setFile({ ...file, unitId: e.target.value });
                }}
              >
                <hr />

                <option selected disabled>
                  اختار الشهر
                </option>
                {units.map((unit) => (
                  <option value={unit.id}>{unit.name}</option>
                ))}
              </select>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={enable}
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
          <DialogTitle>تعديل فيديو </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="اسم "
              name="name"
              aria-describedby="emailHelp"
              value={file_.name}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setFile_({ ...file_, name: e.target.value });
              }}
            />

            <div class="form-group w-20 fmgp">
              <input
                type="file"
                onChange={(e) => {
                  console.log(e.target.files);
                  console.log("------------");

                  upload_(e);
                }}
              />
            </div>
            <div class="select-dropdown">
              <select
                class="form-control"
                onChange={(e) => {
                  console.log(e.target.value);
                  setFile_({ ...file_, unitId: e.target.value });
                }}
              >
                <hr />

                <option selected disabled>
                  اختار الشهر
                </option>
                {units.map((unit) => (
                  <option value={unit.id}>{unit.name}</option>
                ))}
              </select>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={enable}
              onClick={(e) => {
                handleClose();
                put();
              }}
            >
              حفظ
            </Button>
            <Button variant="primary" onClick={handleClose_}>
              رجوع
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Tables;
