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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import ReactQuill from "react-quill";
import { Quill } from "react-quill";

const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = ["arial", "comic-sans", "courier-new", "georgia", "helvetica", "lucida"];
Quill.register(Font, true);
import "react-quill/dist/quill.snow.css";
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

  const [exam, setExam] = useState({
    name: "",
    unitId: "",
    questions: [{ question: "", answer: "" }],
  });

  const [enable, setEnable] = useState(true);

  const [exam_, setExam_] = useState({
    id: 0,
    name: "",
    unitId: "",
    questions: [{ question: "", answer: "" }],
  });
  const [show, setShow] = useState(false);
  const [show_, setShow_] = useState(false);

  const handleClose = () => {
    setExam({
      name: "",
      unitId: "",
      questions: [{ question: "", answer: "" }],
    });
    setShow(false);
  };
  const handleClose_ = () => {
    setExam_({
      name: "",
      unitId: "",
      questions: [{ question: "", answer: "" }],
    });
    setShow_(false);
  };

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
      url: `${process.env.REACT_APP_BASE_URL}exam/${id || -1}`,
    }).then((result) => {
      let da = result.data.exams;

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

  const delet = (exam) => {
    console.log(exam);
    axios({
      method: "delete",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `${process.env.REACT_APP_BASE_URL}exam/`,
      data: { id: exam },
    }).then((result) => {
      getdata();
    });
  };

  const add = (e) => {
    // e.preventDefault();

    console.log(exam);
    axios({
      method: "post",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `${process.env.REACT_APP_BASE_URL}exam/`,
      data: { ...exam },
    }).then((result) => {
      console.log(result);
      getdata();
      setExam({
        name: "",
        unitId: "",
        questions: [{ question: "", answer: "" }],
      });

      handleClose();
    });
  };

  const put = (e) => {
    axios({
      method: "put",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `${process.env.REACT_APP_BASE_URL}exam/`,
      data: { ...exam_ },
    }).then((result) => {
      getdata();
      handleClose_();

      setExam_({
        id: 0,
        name: "",
        unitId: "",
        questions: [{ question: "", answer: "" }],
      });
    });
  };

  const handleFormChange = (index, event) => {
    let questions = [...exam.questions];
    console.log(event.target.value, index);
    questions[index][event.target.name] = event.target.value;
    setExam({ ...exam, questions });
  };

  const addFields = () => {
    let newfield = { question: "", answer: "" };
    setExam({ ...exam, questions: [...exam.questions, newfield] });
  };

  const removeFields = (index) => {
    let questions = [...exam.questions];
    questions.splice(index, 1);
    setExam({ ...exam, questions });
  };

  const handleFormChange_ = (index, event) => {
    let questions = [...exam_.questions];
    console.log(event.target.value, index);
    questions[index][event.target.name] = event.target.value;
    setExam_({ ...exam_, questions });
  };

  const addFields_ = () => {
    let newfield = { question: "", answer: "" };
    setExam_({ ...exam_, questions: [...exam_.questions, newfield] });
  };

  const removeFields_ = (index) => {
    let questions = [...exam_.questions];
    questions.splice(index, 1);
    setExam_({ ...exam_, questions });
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
                let y = units.find((i) => data.unitId == i.id);

                return <p>{y?.name}</p>;
              },
            },
          ]}
          data={data}
          actions={[
            {
              icon: "edit",
              onClick: (event, rowData) => {
                setExam_({ ...rowData });
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

        <Dialog open={show} onClose={handleClose} maxWidth="xl" fullWidth>
          <DialogTitle>اضافة امتحان</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="اسم "
              name="name"
              aria-describedby="emailHelp"
              value={exam.name}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setExam({ ...exam, name: e.target.value });
              }}
            />

            <div class="select-dropdown">
              <select
                class="form-control"
                onChange={(e) => {
                  console.log(e.target.value);
                  setExam({ ...exam, unitId: e.target.value });
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

            {exam.questions.map((input, index) => {
              return (
                <div key={index}>
                  {/* <MUIRichTextEditor
                    label="السوال"
                    fullWidth
                    autoFocus
                    margin="dense"
                    id="name"
                    name="question"
                    value={input.question}
                    onChange={(event) => console.log(event)}
                  /> */}

                  <ReactQuill
                    theme="snow"
                    key={index}
                    value={input.question}
                    style={{ marginBlock: 15 }}
                    placeholder="السوال"
                    defaultValue="السوال"
                    modules={{
                      toolbar: [
                        "font",
                        "size",
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "color",
                        "background",
                        "script",
                        "header",
                        "blockquote",
                        "code-block",
                        "indent",
                        "list",
                        "direction",
                        "align",
                        "link",
                        "image",
                        "video",
                        "formula",
                      ],
                    }}
                    formats={[
                      "font",
                      "size",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "color",
                      "background",
                      "script",
                      "header",
                      "blockquote",
                      "code-block",
                      "indent",
                      "list",
                      "direction",
                      "align",
                      "link",
                      "image",
                      "video",
                      "formula",
                    ]}
                    onChange={(e) => {
                      handleFormChange(index, { target: { value: e, name: "question" } });
                    }}
                  />

                  {/* <input
                    fullWidth
                    autoFocus
                    margin="dense"
                    id="name"
                    label="السوال "
                    name="question"
                    value={input.question}
                    onChange={(event) => handleFormChange(index, event)}
                  /> */}

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">الاجابه</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={input.answer}
                      label="الاجابه"
                      sx={{ height: 50 }}
                      onChange={(e) => {
                        console.log(e.target.value);
                        handleFormChange(index, {
                          target: { value: e.target.value, name: "answer" },
                        });
                      }}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                    </Select>
                  </FormControl>
                  <Button fullWidth color="warning" onClick={() => removeFields(index)}>
                    مسح
                  </Button>
                </div>
              );
            })}
            <Button fullWidth onClick={addFields}>
              اضافة سوال
            </Button>
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

        <Dialog open={show_} onClose={handleClose_} maxWidth="xl" fullWidth>
          <DialogTitle>تعديل امتحان</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="اسم "
              name="name"
              aria-describedby="emailHelp"
              value={exam_.name}
              fullWidth
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setExam_({ ...exam_, name: e.target.value });
              }}
            />

            <div class="select-dropdown">
              <select
                class="form-control"
                onChange={(e) => {
                  console.log(e.target.value);
                  setExam_({ ...exam_, unitId: e.target.value });
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

            {exam_.questions.map((input, index) => {
              return (
                <div key={index}>
                  {/* <MUIRichTextEditor
                    label="السوال"
                    fullWidth
                    autoFocus
                    margin="dense"
                    id="name"
                    name="question"
                    value={input.question}
                    onChange={(event) => console.log(event)}
                  /> */}

                  <ReactQuill
                    theme="snow"
                    value={input.question}
                    style={{ marginBlock: 15 }}
                    placeholder="السوال"
                    defaultValue="السوال"
                    modules={{
                      toolbar: [
                        "font",
                        "size",
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "color",
                        "background",
                        "script",
                        "header",
                        "blockquote",
                        "code-block",
                        "indent",
                        "list",
                        "direction",
                        "align",
                        "link",
                        "image",
                        "video",
                        "formula",
                      ],
                    }}
                    formats={[
                      "font",
                      "size",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "color",
                      "background",
                      "script",
                      "header",
                      "blockquote",
                      "code-block",
                      "indent",
                      "list",
                      "direction",
                      "align",
                      "link",
                      "image",
                      "video",
                      "formula",
                    ]}
                    onChange={(e) => {
                      handleFormChange_(index, { target: { value: e, name: "question" } });
                    }}
                  />

                  {/* <input
                    fullWidth
                    autoFocus
                    margin="dense"
                    id="name"
                    label="السوال "
                    name="question"
                    value={input.question}
                    onChange={(event) => handleFormChange(index, event)}
                  /> */}

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">الاجابه</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={input.answer}
                      label="الاجابه"
                      sx={{ height: 50 }}
                      onChange={(e) => {
                        console.log(e.target.value);
                        handleFormChange_(index, {
                          target: { value: e.target.value, name: "answer" },
                        });
                      }}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                    </Select>
                  </FormControl>

                  <Button fullWidth color="warning" onClick={() => removeFields_(index)}>
                    مسح
                  </Button>
                </div>
              );
            })}
            <Button fullWidth onClick={addFields_}>
              اضافة سوال
            </Button>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(e) => {
                handleClose_();
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
