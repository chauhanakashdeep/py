import TextField from "./../../components/TextField/TextField";
import { Tooltip, IconButton } from "@mui/material";
import FileUploadSharpIcon from "@mui/icons-material/FileUploadSharp";
import ImageIcon from '@mui/icons-material/Image';
import VisibilitySharpIcon from '@mui/icons-material/VisibilityOff';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ButtonBase } from "@mui/material";

import {
  AppBar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Toast from "../../components/Toast";
import { initiateAISAction } from "../../redux/actions/initiateAISActions";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SelectField from "../../components/SelectField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ButtonWrapper from "../../components/FormsUI/Button/Button";
import TextFields from "@mui/material/TextField";
import moment from "moment";
import { saveDataTrustIdAction } from "../../redux/actions/saveDataTrustIDActions";
import { upploadAISdocs } from "../../redux/actions/AisUploadAction";
import { useState } from "react";
import { specialityinitAction } from "../../redux/actions/specialityInitAction";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import apicon from "../../assests/images/apGovNew_logo.png"
import { Image } from "@mui/icons-material";
import SyncIcon from '@mui/icons-material/Sync';

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { DialogContentText } from "@mui/material";
import { Navigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import CircularIndeterminate from "../../components/FormsUI/Loader/Loader";

// function createData(name, calories) {
//   return { name, calories };
// }

export default function InitiateAISOfficer({ props, inboxred }) {
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "Diagnosis reports",
      attachements: [],
    },
    {
      id: 2,
      name: "Case sheet",
      attachements: [],
    },
    {
      id: 3,
      name: "Discharge Summary",
      attachements: [],
    },
    {
      id: 4,
      name: "Detailed bill",
      attachements: [],
    },
    {
      id: 5,
      name: "Consolidated Bill",
      attachements: [],
    },
    {
      id: 6,
      name: "Self-declaration of non-drawl",
      attachements: [],
    },
    {
      id: 7,
      name: "Dependent declaration -  Non mandatory attachment",
      attachements: [],
    },

  ]);

  const speciality = [];

  const dispatch = useDispatch();
  React.useEffect(() => {
    const payload = {
      trustId: props,
    };

    dispatch(initiateAISAction(payload));
  }, [dispatch]);


  React.useEffect(() => {
    dispatch(specialityinitAction());
  }, [dispatch]);

  const navigate = useNavigate();



  const initiateAISData = useSelector((state) => state.initiateAISReducer);
  const data = useSelector((state) => state.specialityInfoReducer);   // fetching dropdown data from speciality reducer

  console.log(data);

  if (Object.keys(data.data).length != 0) {
    //  console.log(data.data.result.specialities);
    data.data.result[`specialities`].forEach(element => speciality.push(element.disMainName));

  }
  //console.log(speciality);

  const { showMessage } = useSelector((state) => state.showMessageReducer);

  const Speciality = speciality;

  const INITIAL_INITIATE_FORM_STATE = {
    amounts: "",
    patientType: "",
    speciality: "",
    dateOfAdmission: "",
    treatmentType: "",
    procedureName: "",
    dateOfSurgery: "",
    dateOfDischarge: "",
    remarks: "",

  };
  const INITIATE_FORM_VALIDATION = Yup.object().shape({
    amounts: Yup.string().required("Required"),
    patientType: Yup.string().required("Required"),
    speciality: Yup.string().required("Required"),
    dateOfAdmission: Yup.date().required("Required"),
    treatmentType: Yup.string().required("Required"),
    dateOfSurgery: Yup.date().required("Required"),
    procedureName: Yup.string().required("Required"),
    dateOfDischarge: Yup.date().required("Required"),
    remarks: Yup.string().required("Required"),

  });


  let InitialInfo = {};
  const [imagesList, setImagesList] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [FilesAccount, setFilesAccount] = useState();
  const [viewFilesAccount, setViewFilesAccount] = useState();
  const [HandleViewButton, setHandleViewButton] = useState(false);



  const [specialityID, setspecialityID] = useState();
  const [specialityName, setspecialityName] = useState();
  const oncheckSpeciality = (archId, archName) => {
    console.log("Speciality Id  ------------------>>>>>>>" + archId);
    setspecialityID(archId);
    setspecialityName(archName);
  }

  const handleRemoveFile = (id) => {
    console.log("File name for emoval is : " + id);
    let files = imagesList.filter((file) => file.name !== id);
    setImagesList(files);
  };


  const handleClose = () => {
    setImagesList(selectedRow.attachements);
    setSelectedRow(null);
    setOpen(false);
  };

  const successCB = () => {
    console.log("Inside successCb");
    inboxred && inboxred();
    console.log("After successCb");
  };


  const handlepostInitialFrom = (info) => {
    console.log("Login Info : ", info);
    if (info) {
      //console.log("Inside handlepostInitialFrom");

      dispatch(saveDataTrustIdAction(info, successCB));
    }
  };

  let payload = {};
  var trustId = localStorage.getItem(trustId);
  var fileArr = [];
  const documentformdata = new FormData();


  const handleAddAttachments = () => {
    rows.map((row) => {
      // console.log("Handle attachments");
      if (row.id === selectedRow.id) {
        row.attachements = imagesList;
        fileArr.push(imagesList);
        payload = [{
          "docId": selectedRow.id,
          "trustId": props,
        },

        ];
        documentformdata.append(
          "payloadDTOList",
          new Blob([JSON.stringify(payload)], { type: "application/json" })
        );
        imagesList.forEach((file) => {
          documentformdata.append("files", file);
        });

        //  console.log("Payload is + ", payload);
        //  console.log("Files are + ", imagesList);
        dispatch(upploadAISdocs(documentformdata));
      }
    });
    setRows(rows);
    setOpen(false);
  }



  const handleImages = (e) => {
    //  console.log(e);
    let images = [];
    if (e.target.files.length > 0) {
      console.log("Under Handle images" + e.target.files.length);
      Promise.all(
        Array.from(e.target.files).map((file) => {
          if (file.type === "application/pdf") {
            console.log("Under pdf");
            images.push(file);

          } else {
            let img = URL.createObjectURL(file);
            images.push(file);
            console.log("images", images);


          }
        })
      );
    }

    setImagesList((imgs) => [...imgs, ...images]);

    //console.log( imagesList);
  };

  const handleCapture = ({ target }) => {
    console.log("handle capture");
    console.log("Selected Account reference : ", target);
    setFilesAccount(target.files[0]);
    setFilesAccount("111");

    // setViewFilesAccount(URL.createObjectURL(target.files[0]));
    if (imagesList != null) {
      setHandleViewButton(true);
      console.log("Files Account is not null");

    }
    else {
      setHandleViewButton(false);


    }

  }

  const handleOpen = (row, state) => {
    // console.log("This is handle open")
    // console.log(row);
    setSelectedRow(row);
    setImagesList(row.attachements);
    if (state) {
      setHandleViewButton(state);

    }
    else {
      setHandleViewButton(false);

    }

    setOpen(true);
  }


  return (
    <>

      {showMessage.title && (
        <Toast
          title={showMessage.title}
          variant={showMessage.variant}
          description={showMessage.description}
          linkText={showMessage.linkText}
          link={showMessage.link}
        />

      )}
      <div className={"d-flex flex-column h-100 scrollbar"}>

        {initiateAISData.data.length != 0 ? (
          <Grid item m={3} mb={3}>
            <AppBar
              position="static"
              sx={{ borderRadius: 1, minHeight: "20%" }}
            >
              <Toolbar variant="dense">
                <Typography variant="h7" color="inherit">
                  LOC Details
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid container m={1}>
              <Grid item xs={8} md={4}>
                <Grid mt={1}>
                  <Typography fontWeight={"bold"} variant="h7">
                    LOC No
                  </Typography>
                  <Typography variant="h7" m={2}>
                    {initiateAISData.data.result.locNo &&
                      initiateAISData.data.result.locNo !== undefined
                      ? initiateAISData.data.result.locNo
                      : ""}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={8} md={4}>
                <Grid mt={1}>
                  <Typography fontWeight={"bold"} variant="h7">
                    LOC Amount
                  </Typography>
                  <Typography variant="h7" m={2}>
                    {initiateAISData.data.result.locAmount &&
                      initiateAISData.data.result.locAmount !== undefined
                      ? initiateAISData.data.result.locAmount
                      : ""}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={8} md={4}>
                <Grid mt={1}>
                  <Typography fontWeight={"bold"} variant="h7">
                    Loc Photo
                  </Typography>
                  <Typography variant="h7" m={2}>
                    {initiateAISData.data.result.locPhoto &&
                      initiateAISData.data.result.locPhoto !== undefined
                      ? initiateAISData.data.result.locPhoto
                      : ""}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item mt={3}>
              <AppBar
                position="static"
                sx={{ borderRadius: 1, minHeight: "20%" }}
              >
                <Toolbar variant="dense">
                  <Typography variant="h7" color="inherit">
                    Personal Details
                  </Typography>
                </Toolbar>
              </AppBar>
              <Grid container m={1}>
                <Grid item xs={8} md={4}>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      Employee Type
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.employeeType &&
                        initiateAISData.data.result.employeeType !== undefined
                        ? initiateAISData.data.result.employeeType
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      Employee Name
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.employeeName &&
                        initiateAISData.data.result.employeeName !== undefined
                        ? initiateAISData.data.result.employeeName
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      Date Of Birth
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.dob &&
                        initiateAISData.data.result.dob !== undefined
                        ? initiateAISData.data.result.dob
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      State
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.state &&
                        initiateAISData.data.result.state !== undefined
                        ? initiateAISData.data.result.state
                        : ""}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={8} md={4}>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      Mobile Number
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.mobileNumber &&
                        initiateAISData.data.result.mobileNumber !== undefined
                        ? initiateAISData.data.result.mobileNumber
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      Age
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.age &&
                        initiateAISData.data.result.age !== undefined
                        ? initiateAISData.data.result.age
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      Date Of Registration
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.dateofRegistration &&
                        initiateAISData.data.result.dateofRegistration !==
                        undefined
                        ? initiateAISData.data.result.dateofRegistration
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      Patient Name
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.patientName &&
                        initiateAISData.data.result.patientName !== undefined
                        ? initiateAISData.data.result.patientName
                        : ""}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={8} md={4}>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      Gender
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.gender &&
                        initiateAISData.data.result.gender !== undefined
                        ? initiateAISData.data.result.gender
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      Relation With Employee
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.relationWithEmployee &&
                        initiateAISData.data.result.relationWithEmployee !==
                        undefined
                        ? initiateAISData.data.result.relationWithEmployee
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      District
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.district &&
                        initiateAISData.data.result.district !== undefined
                        ? initiateAISData.data.result.district
                        : ""}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item mt={3}>
              <AppBar
                position="static"
                sx={{ borderRadius: 1, minHeight: "20%" }}
              >
                <Toolbar variant="dense">
                  <Typography variant="h7" color="inherit">
                    Working Details
                  </Typography>
                </Toolbar>
              </AppBar>
              <Grid container m={1}>
                <Grid item xs={8} md={4}>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      Employee Id
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.employeeID &&
                        initiateAISData.data.result.employeeID !== undefined
                        ? initiateAISData.data.result.employeeID
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      Place of District
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.placeOfDistrict &&
                        initiateAISData.data.result.placeOfDistrict !== undefined
                        ? initiateAISData.data.result.placeOfDistrict
                        : ""}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={8} md={4}>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      Employee Designation
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.employeeDesignation &&
                        initiateAISData.data.result.employeeDesignation !==
                        undefined
                        ? initiateAISData.data.result.employeeDesignation
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      Department Name
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.departmentName &&
                        initiateAISData.data.result.departmentName !== undefined
                        ? initiateAISData.data.result.departmentName
                        : ""}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={8} md={4}>
                  <Grid mt={1}>
                    <Typography fontWeight={"bold"} variant="h7">
                      Place of Work
                    </Typography>
                    <Typography variant="h7" m={2}>
                      {initiateAISData.data.result.placeOfWork
                        ? initiateAISData.data.result.placeOfWork
                        : ""}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Formik
              initialValues={{
                ...INITIAL_INITIATE_FORM_STATE,
              }}
              validationSchema={INITIATE_FORM_VALIDATION}
              onSubmit={(values) => {
                console.log("Values", values);
                let info = values;
                let dfa = Date(info.dateOfAdmission);
                info.dateOfAdmission = moment(dfa).format('YYYY-MM-DD');
                let dfd = Date(info.dateOfDischarge);
                info.dateOfDischarge = moment(dfd).format('YYYY-MM-DD');
                let dfs = Date(info.dateOfSurgery);
                info.dateOfSurgery = moment(dfs).format('YYYY-MM-DD');
                console.log(values.birthday);
                console.log("Values", info);
                InitialInfo = {
                  "amountClaimed": info.amounts,
                  "patientType": info.patientType,
                  "dateOfAdmission": info.dateOfAdmission,
                  "dateOfTreatment": info.dateOfSurgery,
                  "dateOfDischarge": info.dateOfDischarge,
                  "speciality": specialityID,
                  "treatmentType": info.treatmentType,
                  "remarks": info.remarks,
                  "trustId": props,
                };
                // console.log(InitialInfo);
                handlepostInitialFrom(InitialInfo);
              }}
            >
              {({
                errors,
                touched,
                values,
                setFieldValue,
                handleSubmit,
                handleChange,
              }) => (
                <Form>
                  <Grid item mt={3}>
                    <AppBar
                      position="static"
                      sx={{ borderRadius: 1, minHeight: "20%" }}
                    >
                      <Toolbar variant="dense">
                        <Typography variant="h7" color="inherit">
                          Amounts
                        </Typography>
                      </Toolbar>
                    </AppBar>
                    <Grid container m={1} mt={3}>
                      <Grid item md={4}>
                        <TextField
                          id="outlined-basic"
                          label="Total Amount Claimed"
                          name="amounts"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item mt={3}>
                    <AppBar
                      position="static"
                      sx={{ borderRadius: 1, minHeight: "20%" }}
                    >
                      <Toolbar variant="dense">
                        <Typography variant="h7" color="inherit">
                          Treatment Protocol
                        </Typography>
                      </Toolbar>
                    </AppBar>
                    <Grid container m={1} mt={3}>
                      <Grid item xs={3} md={3}>
                        <Grid mt={1}>
                          <FormControl>
                            <FormLabel
                              id="demo-row-radio-buttons-group-label"
                              required
                            >
                              Treatment Type
                            </FormLabel>
                            <RadioGroup
                              required
                              row
                              label="Patient Type"
                              name="patientType"
                              value={values.patientType}
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value="IP"
                                control={<Radio />}
                                label="IP"
                              />
                              <FormControlLabel
                                value="OP"
                                control={<Radio />}
                                label="OP"
                              />
                            </RadioGroup>
                            <FormHelperText
                              error={
                                touched.patientType &&
                                Boolean(errors.patientType)
                              }
                            >
                              {touched.patientType && errors.patientType}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid mt={1} xs={4} md={4}>
                          <SelectField
                            name="speciality"
                            label="Speciality"
                            options={Speciality}
                            oncheckSpeciality={oncheckSpeciality}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={3} md={3}>
                        <Grid mt={1}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                              inputFormat="MM/DD/YYYY"
                              value={values.dateOfAdmission}
                              onChange={(value) =>
                                setFieldValue("dateOfAdmission", value, true)
                              }
                              name="dateOfAdmission"
                              maxDate={new Date()}
                              label="Date of Issue"
                              renderInput={(params) => (
                                <TextFields
                                  error={Boolean(
                                    touched.dateOfAdmission &&
                                    errors.dateOfAdmission
                                  )}
                                  helperText={
                                    touched.dateOfAdmission &&
                                    errors.dateOfAdmission
                                  }
                                  variant="outlined"
                                  required
                                  {...params}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid mt={2}>
                          <FormControl>
                            <FormLabel
                              id="demo-row-radio-buttons-group-label"
                              required
                            >
                              Treatment Type
                            </FormLabel>
                            <RadioGroup
                              required
                              row
                              label="Treatment Type"
                              name="treatmentType"
                              value={values.treatmentType}
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value="Medical"
                                control={<Radio />}
                                label="Medical"
                              />
                              <FormControlLabel
                                value="Surgical"
                                control={<Radio />}
                                label="Surgical"
                              />
                            </RadioGroup>
                            <FormHelperText
                              error={
                                touched.treatmentType &&
                                Boolean(errors.treatmentType)
                              }
                            >
                              {touched.treatmentType && errors.treatmentType}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid item md={3} xs={3}>
                        <Grid mt={1}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                              inputFormat="MM/DD/YYYY"
                              value={values.dateOfSurgery}
                              onChange={(value) =>
                                setFieldValue("dateOfSurgery", value, true)
                              }
                              name="dateOfSurgery"
                              maxDate={new Date()}
                              label="Date of Surgery/Treatment(IP*)"
                              renderInput={(params) => (
                                <TextFields
                                  error={Boolean(
                                    touched.dateOfSurgery &&
                                    errors.dateOfSurgery
                                  )}
                                  helperText={
                                    touched.dateOfSurgery &&
                                    errors.dateOfSurgery
                                  }
                                  variant="outlined"
                                  required
                                  {...params}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid mt={3}>
                          <TextField
                            id="outlined-basic"
                            label="Procedure Name"
                            name="procedureName"
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      <Grid item md={3} xs={3}>
                        <Grid mt={1}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                              inputFormat="MM/DD/YYYY"
                              value={values.dateOfDischarge}
                              onChange={(value) =>
                                setFieldValue("dateOfDischarge", value, true)
                              }
                              name="dateOfDischarge"
                              minDate={new Date()}
                              label="Date of Discharge"
                              renderInput={(params) => (
                                <TextFields
                                  error={Boolean(
                                    touched.dateOfDischarge &&
                                    errors.dateOfDischarge
                                  )}
                                  helperText={
                                    touched.dateOfDischarge &&
                                    errors.dateOfDischarge
                                  }
                                  variant="outlined"
                                  required
                                  {...params}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item mt={3}>
                    <AppBar
                      position="static"
                      sx={{ borderRadius: 1, minHeight: "20%" }}
                    >
                      <Toolbar variant="dense">
                        <Typography variant="h7" color="inherit">
                          Attachments
                        </Typography>
                      </Toolbar>
                    </AppBar>
                    <Grid>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>S No</TableCell>
                              <TableCell>Name of Document</TableCell>
                              <TableCell>Upload/View</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>

                                <TableCell>

                                  <input
                                    accept="file/*"
                                    id="icon-button-file_upload"
                                    //type="file"
                                    style={{ display: "none" }}
                                    onChange={handleCapture}
                                  />
                                  <label
                                    htmlFor="icon-button-file_upload"
                                    onClick={() => handleOpen(row, true)}
                                  >

                                    <Tooltip title="Please upload respective Passbook">
                                      <IconButton color="primary" component="span">
                                        <FileUploadSharpIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </label>

                                  <Tooltip title="To preview Passbook">
                                    {(imagesList != null) ? (

                                      <ButtonBase onClick={() => handleOpen(row, false)}>
                                        <VisibilitySharpIcon color="primary"></VisibilitySharpIcon>
                                      </ButtonBase>
                                    ) : (
                                      <ButtonBase disabled>
                                        <VisibilityOffIcon color="error" ></VisibilityOffIcon>
                                      </ButtonBase>
                                    )
                                    }




                                  </Tooltip>


                                  {/* <Button variant="contained" onClick={handleOpen} >Upload</Button> */}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                  <Grid item mt={2}>
                    <Typography fontWeight={"bold"} required>
                      Remarks *
                    </Typography>
                    <Grid container mt={1}>
                      <Grid item md={6}>
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Remarks"
                          name="remarks"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    alignContent={"center"}
                    marginLeft={"50%"}
                    mt={"1%"}
                    marginBottom={"1%"}
                  >
                    <ButtonWrapper variant="contained">Initiate</ButtonWrapper>
                  </Grid>
                </Form>
              )}

            </Formik>
          </Grid>

        ) : (
          <CircularIndeterminate alignContent="center"/>
          
        )}

        <Dialog open={open} onClose={handleClose} maxWidth={"md"} fullWidth >
          <DialogTitle>Attachments</DialogTitle>
          <DialogContent>
            {HandleViewButton ?
              <Button variant="contained" component="label">
                Browse
                <input
                  hidden
                  accept="image/*,.pdf"
                  multiple
                  type="file"
                  onChange={handleImages}
                  margin="10px"
                />

              </Button>
              : ""}
            <Box sx={{ display: "flex" }}>
              {imagesList &&
                imagesList.map((file) => {

                  if (file.type == "application/pdf") {
                    return (
                      <div style={{ position: "relative" }}>
                        <a
                          href={file.name}
                          download
                          key={file.id}
                          style={{
                            color: "red",
                            display: "flex",
                            fontSize: "10px",
                            textDecoration: "none",
                            margin: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              width: 100,
                              height: 100,
                              padding: 2,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "1px solid grey",
                              margin: "10px",

                            }}
                          >
                            <PictureAsPdfIcon />
                            <Typography
                              sx={{

                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "1",
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {file.name}
                            </Typography>
                          </Box>
                        </a>
                        <HighlightOffIcon
                          sx={{
                            position: "absolute",
                            right: "5px",
                            top: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleRemoveFile(file.name)}
                        />
                      </div>
                    );
                  }
                })}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {imagesList &&
                imagesList.map((file) => {

                  if (file.type != "application/pdf") {
                    console.log("Images inserted");
                    console.log(file);
                    return (
                      <div style={{ display: "flex", position: "relative", margin: "10" }}>



                        <Box sx={{ display: "flex" }}>


                          <Typography
                            sx={{

                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: "1",
                              WebkitBoxOrient: "vertical",
                              margin: "10px"
                            }}
                          >
                            {file.name}
                          </Typography>

                          <HighlightOffIcon
                            sx={{
                              position: "relative",
                              right: "5px",
                              top: "5px",
                              cursor: "pointer",
                              left: "10px"

                            }}
                            onClick={() => handleRemoveFile(file.name)}
                          />
                        </Box>
                      </div>
                    );
                  }
                })}
            </Box>
          </DialogContent>

          <DialogActions>

            <Button onClick={handleClose}>Cancel</Button>
            {HandleViewButton ?
              <Button onClick={handleAddAttachments}>Upload</Button>
              :
              ""}

          </DialogActions>


        </Dialog>

      </div>

    </>
  );
}

