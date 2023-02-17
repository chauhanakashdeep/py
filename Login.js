import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from '../../components/Accordion';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import ButtonWrapper from '../../components/FormsUI/Button/Button';
import TextFields from '../../components/TextField/TextField';
import { useNavigate } from "react-router-dom";
import { loginAction } from '../../redux/actions/loginActions';
import { showMessage } from '../../redux/actions/showMessage';
import Toast from '../../components/Toast';
import RefreshIcon from '@mui/icons-material/Refresh';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import  { Component } from 'react'; 
import { sizeHeight } from '@mui/system';
import "./Login.module.css";

const paperStyle = { padding: 20, height: '100%', width: 280, margin: "2% auto" }
const avatarStyle = { backgroundColor: '#1bbd7e' }
const btnstyle = { margin: '8px 0' }
const reloadColor = {color : "#1976d2", display: 'flex'};
const setHeight = {height:"5",
width:"5"}





////Captcha code added
var isCaptcha = false;

const LOGIN_FORM_VALIDATION = Yup.object().shape({
 
    user_captcha_input: Yup.string().required('Required'),
});
//Captcha Validation
function doSubmit() {
  let user_captcha = document.getElementById('user_captcha_input').value;
 

  if (validateCaptcha(user_captcha) === true) {
    isCaptcha =true;
    console.log("SET CAPTCHA TO 1 ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",isCaptcha);
    document.getElementById('user_captcha_input').value = "";
  }

  else {
    alert('Captcha Does Not Match');
    isCaptcha = false;
    document.getElementById('user_captcha_input').value = "";
    
  }
};

class Captcha extends Component {

  componentDidMount() {
    loadCaptchaEnginge(6);
  };

  

  render() {


    return (<div>

      <div className="form-group">

        <div className="col mt-3">
          < LoadCanvasTemplate sx={{display:"flex"}} style={reloadColor} />
          
          <div>
          <TextField
          label="Enter Captcha"
          id="user_captcha_input"
          defaultValue=""
          variant="filled"
          size="small"
        />
          {/* <input placeholder="Enter Captcha Value" id="user_captcha_input" name="user_captcha_input" type="text" style={{setHeight}}></input> */}
          </div>
          
        </div>



      </div>


    </div>);
  };
}

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let basicInfo = {}
  const loginData = useSelector((state) => (state.loginReducer));
  console.log("Login Data : ", loginData);
  const { showMessage } = useSelector((state) => state.showMessageReducer);
  console.log("showMessage Data : ", showMessage);

  const INITIAL_LOGIN_FORM_STATE = {
    username: '',
    password: ''
  };
  const LOGIN_FORM_VALIDATION = Yup.object().shape({
    username: Yup.string().required('Required')
      .email("Invalid email address format"),
    password: Yup.string().required('Required'),
  });
  const successCB = () => {
    if(isCaptcha)
    {
      navigate('/search')
    }
    
    
  };
  const handlepostLogin = (info) => {
    doSubmit();
    
    console.log("Captcha value is *************************************************************"+isCaptcha);
    console.log("Login Info : ", info);
    
    if ((info)&&isCaptcha)  {
      
      dispatch(loginAction(info, successCB));
    }
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
      <div className={"d-flex flex-column h-100"}>
        <Header />
        <Grid container >
          <Paper elevation={10} style={paperStyle}>
            <Grid item align='center'>
              <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
              <Grid item mt={2}>
                <h3>Sign In</h3>
              </Grid>
            </Grid>
            <Grid item mt={2}>
              <Formik
                initialValues={{
                  ...INITIAL_LOGIN_FORM_STATE
                }}
                validationSchema={LOGIN_FORM_VALIDATION}
                onSubmit={values => {
                  console.log("Values", values);
                  basicInfo =
                  {
                    "username": values.username,
                    "password": values.password
                  }
                  handlepostLogin(basicInfo);
                }}
              >
                <Form>
                  <Grid item mt={2}>
                    <TextFields id="standard-basic" label="Enter username" variant="standard" name="username" fullWidth />
                  </Grid>
                  <Grid item mt={2}>
                    <TextFields id="outlined-password-input" label="Enter password" variant="standard" showPassword="password" name="password" fullWidth />
                  </Grid>
                  <Grid item mt={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="Remember me"
                    />
                  </Grid>
                  {/*    Captcha Added  */}
                  <Grid>
                    <Captcha />
                  </Grid>


                  <Grid item mt={2}>
                    <ButtonWrapper color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</ButtonWrapper>
                  </Grid>
                   <Typography >
                     <Link href="/hospitalregistration/forgetpassword" >
                        Forgot password
                </Link>
                </Typography>
                </Form>
              </Formik>
            </Grid>
          </Paper>
        </Grid>
        <Footer />
      </div>
    </>
  );

}