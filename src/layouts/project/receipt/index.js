// Material Dashboard 2 React components
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import axios from "axios";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function Tables() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [receipt_, setReceipt_] = useState({});
  const [receipt, setReceipt] = useState([]);

  useEffect(() => {
    getReceipt();
  }, []);

  const getReceipt = () => {
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `${process.env.REACT_APP_BASE_URL}receipt/`,
    }).then((result) => {
      let da = result.data.receipts.reverse();

      console.log(da);
      setReceipt([]);
      setReceipt(da);
    });
  };

  const put = (body) => {
    axios({
      method: "put",
      headers: { Authorization: `Bearer ${localStorage.getItem("students-app-token")}` },
      url: `${process.env.REACT_APP_BASE_URL}receipt/`,
      data: body,
    }).then((result) => {
      getReceipt();
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        pt={6}
        pb={3}
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {receipt.map((r) => (
          <Paper
            sx={{
              p: 2,
              margin: 2,
              flexGrow: 1,
              maxWidth: 590,
              backgroundColor:
                r.status == "APPROVED" ? "#bad9bd" : r.status == "DECLINED" ? "#deaca2" : "white",
            }}
          >
            <Grid
              container
              spacing={2}
              // onClick={() => {
              //   setReceipt_(r);
              //   setShow(true);
              // }}
            >
              <Grid
                item
                onClick={() => {
                  setReceipt_(r);
                  setShow(true);
                }}
              >
                <ButtonBase
                  sx={{ width: 300, height: 300 }}
                  onClick={() => {
                    setReceipt_(r);
                    setShow(true);
                  }}
                >
                  <Img
                    alt="complex"
                    src={r.link}
                    height="300"
                    onClick={() => {
                      setReceipt_(r);
                      setShow(true);
                    }}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div">
                      تاريخ الدفع{new Date(r.createdAt).toLocaleDateString()}
                    </Typography>
                  </Grid>

                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div">
                      اسم الطالب:{r.student.name}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div">
                      اسم الشهر:{r.unit.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={(e) => {
                        put({ id: r.id, status: "APPROVED" });
                      }}
                    >
                      قبول
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        put({ id: r.id, status: "DECLINED" });
                      }}
                    >
                      رفض
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </MDBox>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle> </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ButtonBase sx={{ width: 600, height: 600 }}>
                <Img alt="complex" src={receipt_?.link} height="600" />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    تاريخ الدفع{new Date(receipt_?.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>

                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    اسم الطالب:{receipt_?.student?.name}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    اسم الشهر:{receipt_?.unit?.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              put({ id: receipt_?.id, status: "APPROVED" });
            }}
          >
            قبول
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              put({ id: receipt_?.id, status: "DECLINED" });
            }}
          >
            رفض
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Tables;
