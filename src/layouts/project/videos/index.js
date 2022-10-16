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

const Tables = () => {
  const [data, setData] = useState([]);
  const [units, setUnits] = useState([]);
  const [exams, setExams] = useState([]);

  const [lesson, setLesson] = useState({
    name: "",
    link: "",
    unit: "",
    exam: null,
    youtubeId: "",
  });

  const [lesson_, setLesson_] = useState({
    id: 0,
    name: "",
    link: "",
    unit: "",
    exam: null,

    youtubeId: "",
  });
  const [show, setShow] = useState(false);
  const [show_, setShow_] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose_ = () => setShow_(false);

  const handleShow = () => setShow(true);

  useEffect(() => {
    getdata();
    getUnits();
    getExams();
  }, []);

  const getdata = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("unitId");
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `${process.env.REACT_APP_BASE_URL}lesson/${id || -1}`,
    }).then((result) => {
      let da = result.data.lessons;

      console.log(da);
      setData([]);
      setData(da);
    });
  };

  const getUnits = () => {
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `${process.env.REACT_APP_BASE_URL}unit/-1`,
    }).then((result) => {
      let da = result.data.units;

      console.log(da);

      setUnits([]);
      setUnits(da);
    });
  };

  const getExams = () => {
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `${process.env.REACT_APP_BASE_URL}exam/-1`,
    }).then((result) => {
      let da = result.data.exams;

      console.log(da);

      setExams([]);
      setExams(da);
    });
  };

  const delet = (lesson) => {
    console.log(lesson);
    axios({
      method: "delete",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `${process.env.REACT_APP_BASE_URL}lesson/`,
      data: { id: lesson },
    }).then((result) => {
      getdata();
    });
  };

  const add = (e) => {
    // e.preventDefault();

    console.log(lesson);
    axios({
      method: "post",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `${process.env.REACT_APP_BASE_URL}lesson/`,
      data: { ...lesson },
    }).then((result) => {
      console.log(result);
      getdata();
      handleClose();

      setLesson({ id: 0, name: "", link: "", unit: "", youtubeId: "", exam: null });
      setLesson_({ id: 0, name: "", link: "", unit: "", youtubeId: "", exam: null });
    });
  };

  const put = (e) => {
    axios({
      method: "put",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `${process.env.REACT_APP_BASE_URL}lesson/`,
      data: { ...lesson_ },
    }).then((result) => {
      getdata();
      handleClose_();
      setLesson({ id: 0, name: "", link: "", unit: "", youtubeId: "", exam: null });
      setLesson_({ id: 0, name: "", link: "", unit: "", youtubeId: "", exam: null });
    });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ width: "100%" }}>
        <MaterialTable
          style={{ backgroundColor: "#eff2f5" }}
          title=" فيديو"
          columns={[
            { title: "الاسم", field: "name" },
            {
              title: "البريد الالكتروني",
              field: "link",
              render: (data) => {
                // console.log(data, years);
                let y = units.find((i) => data.unitId == i.id);

                return <p>{y?.name}</p>;
              },
            },
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
                setLesson_({ ...rowData });
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
          <DialogTitle>اضافة فيديو</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="اسم "
              name="name"
              aria-describedby="emailHelp"
              value={lesson.name}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setLesson({ ...lesson, name: e.target.value });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="link"
              label="رابط الفديو "
              name="link"
              aria-describedby="emailHelp"
              value={lesson.link}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setLesson({ ...lesson, link: e.target.value });
              }}
            />{" "}
            <TextField
              autoFocus
              margin="dense"
              id="youtubeId"
              label="youtube Id "
              name="youtubeId"
              aria-describedby="emailHelp"
              value={lesson.youtubeId}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setLesson({ ...lesson, youtubeId: e.target.value });
              }}
            />
            <div class="select-dropdown">
              <select
                class="form-control"
                onChange={(e) => {
                  console.log(e.target.value);
                  setLesson({ ...lesson, unit: e.target.value });
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
            <div class="select-dropdown">
              <select
                class="form-control"
                onChange={(e) => {
                  console.log(e.target.value);
                  setLesson({ ...lesson, exam: e.target.value });
                }}
              >
                <hr />

                <option selected disabled>
                  اختار الامتحان ان وجذ
                </option>
                {exams.map((exam) => (
                  <option value={exam.id}>{exam.name}</option>
                ))}
              </select>
            </div>
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
          <DialogTitle>تعديل فيديو </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="اسم "
              name="name"
              aria-describedby="emailHelp"
              value={lesson_.name}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setLesson_({ ...lesson_, name: e.target.value });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="link"
              label="رابط الفديو "
              name="link"
              aria-describedby="emailHelp"
              value={lesson_.link}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setLesson_({ ...lesson_, link: e.target.value });
              }}
            />{" "}
            <TextField
              autoFocus
              margin="dense"
              id="youtubeId"
              label="youtube Id "
              name="youtubeId"
              aria-describedby="emailHelp"
              value={lesson_.youtubeId}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setLesson_({ ...lesson_, youtubeId: e.target.value });
              }}
            />
            <div class="select-dropdown">
              <select
                class="form-control"
                onChange={(e) => {
                  console.log(e.target.value);
                  setLesson_({ ...lesson_, unit: e.target.value });
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
            <div class="select-dropdown">
              <select
                class="form-control"
                onChange={(e) => {
                  console.log(e.target.value);
                  setLesson_({ ...lesson_, exam: e.target.value });
                }}
              >
                <hr />

                <option selected disabled>
                  اختار الامتحان ان وجذ
                </option>
                {exams.map((exam) => (
                  <option value={exam.id}>{exam.name}</option>
                ))}
              </select>
            </div>
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
