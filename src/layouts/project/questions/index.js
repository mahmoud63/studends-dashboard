// Material Dashboard 2 React components
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

function Tables() {
  const [show, setShow] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [question, setQuestion] = useState({ question: "", answer: "", id: "" });
  const handleClose = () => setShow(false);

  useEffect(() => {
    getquestions();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("questionId");
  }, []);

  const getquestions = () => {
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/question/`,
    }).then((result) => {
      let da = result.data.questions.reverse();

      console.log(da);
      setQuestions([]);
      setQuestions(da);
    });
  };

  const delet = (id) => {
    axios({
      method: "delete",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/question/`,
      data: { id: id },
    }).then((result) => {
      getquestions();
    });
  };

  const add = (e) => {
    axios({
      method: "post",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/question/`,
      data: { ...question },
    }).then((result) => {
      getquestions();
    });
  };

  const put = (e) => {
    axios({
      method: "put",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `https://api.students.blankweb.online/api/question/`,
      data: question,
    }).then((result) => {
      setShow(false);
      getquestions();
      setQuestion({ question: "", answer: "", id: "" });
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {questions.map((q) => (
          <Paper
            sx={{
              p: 2,
              margin: "auto",
              marginBlockEnd: 2,

              flexGrow: 1,
              backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div">
                      {q.question}
                    </Typography>
                    <TextField
                      id="outlined-multiline-static"
                      label="الاجابه"
                      multiline
                      rows={4}
                      fullWidth
                      disabled
                      value={q.answer}
                      defaultValue={q.answer}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={(e) => {
                        setQuestion({ ...q });
                        setShow(true);
                      }}
                    >
                      اجابة
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        delet(q.id);
                      }}
                    >
                      مسح
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </MDBox>

      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>اجابة سوال</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {question.question}
                  </Typography>
                  <TextField
                    sx={{ width: 540 }}
                    id="outlined-multiline-static"
                    label="الاجابه"
                    multiline
                    rows={4}
                    value={question.answer}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setQuestion({ ...question, answer: e.target.value });
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              console.log(question);
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
    </DashboardLayout>
  );
}

export default Tables;
