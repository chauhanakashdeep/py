import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { mandatoryaction } from "../../redux/actions/mandatyFieldAction";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DialogContentText, TextField } from "@mui/material";
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers";
import {
  Alert,
  Box,
  ButtonBase,
  IconButton,
  Input,
  Tooltip,
} from "@mui/material";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FileUploadSharpIcon from "@mui/icons-material/FileUploadSharp";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import InfoIcon from "@mui/icons-material/Info";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch } from "react-redux";




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function HospitalTable() {
  // const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "Building plan approval",
      issuing_authority: "Municipal/Panchayath Authority",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: 2,
      name: "Building Occupancy Certificate",
      issuing_authority: "Municipal/Panchayath Authority",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: 3,
      name: "Trade License Certificate",
      issuing_authority: "Municipal/Panchayath Authority",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: 4,
      name: "Allopathic Private Medical Care Estb. (APMCE) Certificate",
      issuing_authority: "DM AND HO",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: 5,
      name: "PCPNDT Act Registration Certificate",
      issuing_authority: "Dist. Appropriate Authority /DM AND HO",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: 6,
      name: "Fire NOC Certificate",
      issuing_authority: "Fire Service Department",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: 7,
      name: "Pollution Control Board Authorisation Certificate",
      issuing_authority: "State Pollution Control Board",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: 8,
      name: "Bio Medical Waste Management Service Certificate",
      issuing_authority: "Notified BMW Service Provider of the District",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: 9,
      name: "Pharmacy Licence",
      issuing_authority: "Drugs Control Administration",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: 10,
      name: "Organ Transplantation Licence",
      issuing_authority: "Appropriate Authority",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: 11,
      name: "Blood bank Licence *",
      issuing_authority: "Drugs Control Administration",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: 12,
      name: "Surgical Spirit Licence",
      issuing_authority: "Prohibition And Excise Department",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: 13,
      name: "Opium Licence",
      issuing_authority: "Drugs Control Administration",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: 14,
      name: "Ambulance Details",
      issuing_authority: "",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: "",
      name: "i.Ambulance Registration Certificate",
      issuing_authority: "Regional Transport Authority",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: "",
      name: "ii.Ambulance Fitness Certificate*",
      issuing_authority: "Regional Transport Authority",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: 9,
      name: "iii.Ambulance Insurance Certificate",
      issuing_authority: "Insurance company",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: 9,
      name: "iv.Ambulance Pollution Certificate",
      issuing_authority: "Regional Transport Authority",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
    {
      id: "",
      name: "v.Ambulance Driving License",
      issuing_authority: "Regional Transport Authority",
      date_of_issue: new Date().toLocaleString() + "",
      date_of_expiry: new Date().toLocaleString() + "",
      attachements: [],
    },
  ]);
  let files = {};
  const dispatch = useDispatch();
  const [viewFilesAccount, setViewFilesAccount] = useState();
  const [imagesList, setImagesList] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [modalOpen, setModalOpen] = useState(true);
  const [filesAccount, setFilesAccount] = useState();
  //new changes
  const [open, setOpen] = React.useState(false);
  const [HandleViewButton, setHandleViewButton] = useState(false);

  const handleClickOpen = (row, state) => {
    console.log("fffff", row.attachements);
    setSelectedRow(row);
    setImagesList(row.attachements);
    if (state) {
      setHandleViewButton(state);

    }
    else {
      setHandleViewButton(false);

    }
    setOpen(true);
  };
  const handleClose = () => {
    setImagesList(selectedRow.attachements);
    setSelectedRow(null);
    setOpen(false);
  };
  let payload = {};
  const mandatoryformdata = new FormData();
  const fileArr = [];
  const handleAddAttachments = () => {

    rows.map((row) => {
      if (row.id === selectedRow.id) {
        row.attachements = imagesList;
        fileArr.push(imagesList);
        payload = {
          nameOfDocuments: row.name,
          hospRegId: "51",
          dateOfIssue: "2022-01-02",
          dateOfExpiry: "2202-02-02",
        };
        mandatoryformdata.append(
          "hospitalMandatoryDocumentsDto",
          new Blob([JSON.stringify(payload)], { type: "application/json" })
        );
        imagesList.forEach((file) => {
          mandatoryformdata.append("files", file);
        });
        dispatch(mandatoryaction(mandatoryformdata));
      }
    });

    console.log("rws are", rows);
    setRows(rows);
    setOpen(false);
  };

  const handleImages = (e) => {
    let images = [];
    if (e.target.files.length > 0) {
      Promise.all(
        Array.from(e.target.files).map((file) => {
          if (file.type === "application/pdf") {
            images.push(file);
            // images.push({
            //   id: file.lastModified,
            //   name: file.name,
            //   type: file.type,
            // });

          } else {
            let img = URL.createObjectURL(file);
            images.push(file);
            // console.log("Files", file);
            //images.push(file);
            // images.push({
            //   id: file.lastModified,
            //   imgSrc: img,
            //   name: file.name,
            //   type: file.type,
            // });
          }
        })
      );
    }

    setImagesList((imgs) => [...imgs, ...images]);
  };
  const handleRemoveFile = (id) => {

    console.log("File name for emoval is : " + id);
    let files = imagesList.filter((file) => file.name !== id);
    setImagesList(files);
  };
  const handleCapture_account = ({ target }) => {
    console.log("Selected Account reference : ", target);
    setFilesAccount(target.files[0]);
    setViewFilesAccount(URL.createObjectURL(target.files[0]));
  };

  const onDownload_account = () => {
    const link = document.createElement("a");
    link.target = "_blank";
    link.href = viewFilesAccount;
    link.click();
  };
  console.log("images are", imagesList);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell>Name of Document</StyledTableCell>
              <StyledTableCell>Issuing Authority</StyledTableCell>
              <StyledTableCell>Date of issue</StyledTableCell>
              <StyledTableCell>Date of expiry</StyledTableCell>
              <StyledTableCell>Attachments</StyledTableCell>
              <StyledTableCell>Sample</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, key) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{key + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.issuing_authority}</TableCell>
                <TableCell>{row.date_of_issue}</TableCell>
                <TableCell>{row.date_of_expiry}</TableCell>
                {/* <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Date of issue"
                      inputFormat="MM/DD/YYYY"
                      // value={value}

                      maxDate={new Date()}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </TableCell> */}
                {/* <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Date of expiry"
                      inputFormat="MM/DD/YYYY"
                      // value={value}
                      maxDate={new Date()}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </TableCell> */}
                <TableCell>
                  <input
                    // accept="file/*"
                    id="icon-button-file_upload"
                    // type="file"
                    style={{ display: "none" }}
                    onChange={handleCapture_account}
                  />
                  <label
                    htmlFor="icon-button-file_upload"
                    onClick={() => handleClickOpen(row, true)}
                  >
                    <Tooltip title="Please upload respective Passbook">
                      <IconButton color="primary" component="span">
                        <FileUploadSharpIcon />
                      </IconButton>
                    </Tooltip>
                  </label>
                  <Tooltip title="To preview Passbook">
                    <ButtonBase onClick={() => handleClickOpen(row, false)}>
                      <VisibilitySharpIcon color="primary"></VisibilitySharpIcon>
                    </ButtonBase>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="To preview sample document">
                    <ButtonBase onClick={onDownload_account}>
                      <InfoIcon color="primary"></InfoIcon>
                    </ButtonBase>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} maxWidth={"md"} fullWidth>
        <DialogTitle>Attachements</DialogTitle>
        <DialogContent>
        {HandleViewButton ?(
          <Button variant="contained" component="label">
            Browse
            <input
              hidden
              accept="image/*,.pdf"
              multiple
              type="file"
              onChange={handleImages}
            />
          </Button>
        ):("")}
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
                          color: "grey",
                          display: "flex",
                          fontSize: "10px",
                          textDecoration: "none",
                          margin: "10px"
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
                            margin: "10px"
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
                  return (
                    <div style={{ display: "flex", position: "relative" }}>
                      <img
                        src={file.imgSrc}
                        key={file.id}
                        alt={file.name}
                        width="100%"
                        loading="lazy"
                      />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {HandleViewButton ? (
          <Button onClick={handleAddAttachments}>Upload</Button>
          ):("")}
        </DialogActions>
      </Dialog>
    </>
  );
}
