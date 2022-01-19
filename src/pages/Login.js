import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
//import @mui/icons for icon username, password 
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/icons-material";
//import css and assets
import ColorsTheme from "../../assets/colors";
import useStyles from "../styles/LoginPage";

import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth-services";
import AuthToken from "../utils/auth-token";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Insert username"),
  password: Yup.string().required("Insert password"),
  rememberMe: Yup.boolean(),
});

export default function Login(props) {
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState("");
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ username, password}) => {
      const result = await AuthService.login({
        username,
        password,
       
      });
      // console.log({ result });
      if (!Boolean(result.error)) {
        const role = AuthService.getUserRole();
        if (role === true) {
          props.history.push("/Home");
        } else {
          AuthToken.removeToken();
          setErrorMsg("Account can't be found");
        }
      } else {
        setErrorMsg(result.error.response.data.msg);
      }
    },
  });

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={6}>
       
            <div className={classes.innerBox}>
              {errorMsg && (
                <Alert severity="error" style={{ margin: "0.5em 0" }}>
                  {errorMsg}
                </Alert>
              )}
              <form onSubmit={formik.handleSubmit}>
                <div className={classes.userPass}>
                  <div className={classes.wrappedTxtFieldCustomer}>
                    <TextField
                      className="txtfield"
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon
                              style={{ color: ColorsTheme.cyanProcess }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      disabled={formik.isSubmitting}
                      error={
                        Boolean(formik.errors.username) &&
                        formik.touched.username
                      }
                      helperText={formik.errors.username}
                      data-test="txt-username"
                    />
                  </div>
                  <div className={classes.wrappedTxtFieldCustomer}>
                    <TextField
                      name="password"
                      className="txtfield"
                      type="password"
                      placeholder="Password"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon
                              style={{ color: ColorsTheme.cyanProcess }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                      error={
                        Boolean(formik.errors.password) &&
                        formik.touched.password
                      }
                      helperText={formik.errors.password}
                      data-test="txt-password"
                    />
                  </div>
                  <div className={classes.wrappedRememberMe}>
                  
                  </div>
                  <div className={classes.wrappedSignIn}>
                    <Button
                      className={
                        formik.isSubmitting
                          ? classes.btnSignInLoading
                          : classes.btnSignIn
                      }
                      fullWidth
                      type="submit"
                      disabled={formik.isSubmitting}
                      data-test="btn-submit"
                    >
                      <b className={classes.btnSignInBold}>
                        {formik.isSubmitting ? "Loading..." : "Sign In"}
                      </b>
                    </Button>
                  </div>
                  <div
                    style={{
                      marginTop: 20,
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                  
                  </div>
                </div>
              </form>
            </div>
      </Grid>
      </Grid>
        );
}
