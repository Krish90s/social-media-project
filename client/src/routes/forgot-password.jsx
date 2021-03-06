import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Avatar,
  Container,
  Typography,
  TextField,
  Button,
  Icon,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import { forgotPassword } from "./../services/forgot-password";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    display: "flex",
    justifyContent: "center",
  },
}));

const ForgotPassword = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    error: "",
  });

  const clickSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: values.email,
    };
    try {
      await forgotPassword(user);
      props.history.push("/verify-email");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setValues({ ...values, error: ex.response.data });
      }
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter Your Registered Email ID
        </Typography>
        <form className={classes.form} onSubmit={clickSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={values.email}
            onChange={handleChange("email")}
          />

          <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Get Reset Link
          </Button>
          <Typography
            component={Link}
            to="/signin"
            variant="body2"
            className={classes.link}
          >
            Back to Signin Page
          </Typography>
        </form>
      </div>
    </Container>
  );
};

export default ForgotPassword;
