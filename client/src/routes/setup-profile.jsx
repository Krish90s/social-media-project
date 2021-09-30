import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Icon,
} from "@material-ui/core";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { setupProfile } from "../services/userService";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
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
    marginTop: theme.spacing(3),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  bigAvatar: {
    width: 150,
    height: 150,
    margin: "auto",
  },
  formControl: {
    width: "100%",
  },
}));

export default function SetupProfile(props) {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [values, setValues] = useState({
    photo: null,
    firstName: "",
    lastName: "",
    livesIn: "",
    about: "",
    gender: "",
    error: "",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = async (e) => {
    e.preventDefault();
    let userId = props.match.params.id;

    let userData = new FormData();
    userData.append("photo", values.photo);
    userData.append("firstName", values.firstName);
    userData.append("lastName", values.lastName);
    userData.append("dateOfBirth", selectedDate);
    userData.append("livesIn", values.livesIn);
    userData.append("about", values.about);
    userData.append("gender", values.gender);
    try {
      await setupProfile(userData, userId);
      window.location = "/home";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setValues({ ...values, error: ex.response.data });
      }
    }
  };

  const photoUrl =
    values.photo === null ? null : URL.createObjectURL(values.photo);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Setup Your Profile
        </Typography>
        <form className={classes.form} onSubmit={clickSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Avatar src={photoUrl} className={classes.bigAvatar} />
              <br />
              <input
                accept="image/*"
                type="file"
                onChange={handleChange("photo")}
                style={{ display: "none" }}
                id="icon-button-file"
              />
              <label htmlFor="icon-button-file">
                <Button variant="contained" color="default" component="span">
                  Upload{"  "}
                  <FileUpload />
                </Button>
              </label>
              <span className={classes.filename}>
                {values.photo ? values.photo.name : ""}
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleChange("firstName")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={handleChange("lastName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-textarea"
                label="About Yourself"
                placeholder="About"
                fullWidth
                multiline
                variant="outlined"
                value={values.about}
                name="about"
                onChange={handleChange("about")}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="livesIn">Living In</InputLabel>
                <Select
                  variant="outlined"
                  labelId="livesIn"
                  fullWidth
                  id="livesIn"
                  name="livesIn"
                  label="Living In"
                  value={values.livesIn}
                  onChange={handleChange("livesIn")}
                >
                  <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                  <MenuItem value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </MenuItem>
                  <MenuItem value="Arunachal Pradesh">
                    Arunachal Pradesh
                  </MenuItem>
                  <MenuItem value="Assam">Assam</MenuItem>
                  <MenuItem value="Bihar">Bihar</MenuItem>
                  <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                  <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
                  <MenuItem value="Dadar and Nagar Haveli">
                    Dadar and Nagar Haveli
                  </MenuItem>
                  <MenuItem value="Daman and Diu">Daman and Diu</MenuItem>
                  <MenuItem value="Delhi">Delhi</MenuItem>
                  <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
                  <MenuItem value="Puducherry">Puducherry</MenuItem>
                  <MenuItem value="Goa">Goa</MenuItem>
                  <MenuItem value="Gujarat">Gujarat</MenuItem>
                  <MenuItem value="Haryana">Haryana</MenuItem>
                  <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
                  <MenuItem value="Jammu and Kashmir">
                    Jammu and Kashmir
                  </MenuItem>
                  <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                  <MenuItem value="Karnataka">Karnataka</MenuItem>
                  <MenuItem value="Kerala">Kerala</MenuItem>
                  <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                  <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                  <MenuItem value="Manipur">Manipur</MenuItem>
                  <MenuItem value="Meghalaya">Meghalaya</MenuItem>
                  <MenuItem value="Mizoram">Mizoram</MenuItem>
                  <MenuItem value="Nagaland">Nagaland</MenuItem>
                  <MenuItem value="Odisha">Odisha</MenuItem>
                  <MenuItem value="Punjab">Punjab</MenuItem>
                  <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                  <MenuItem value="Sikkim">Sikkim</MenuItem>
                  <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                  <MenuItem value="Telangana">Telangana</MenuItem>
                  <MenuItem value="Tripura">Tripura</MenuItem>
                  <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                  <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                  <MenuItem value="West Bengal">West Bengal</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={12}>
                <KeyboardDatePicker
                  variant="dialog"
                  format="dd/MM/yyyy"
                  fullWidth
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date Of Birth"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange("gender")}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
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
            Setup Profile
          </Button>
        </form>
      </div>
    </Container>
  );
}
