import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Avatar,
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";

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

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const VerifyEmail = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.link}>
          A Password Reset Link Has Been Sent To Your Registered Email-Id
        </Typography>
        <Button
          component={Link}
          to="/signin"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Back To Signin Page
        </Button>
      </div>
    </Container>
  );
};

export default VerifyEmail;
