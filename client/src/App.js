import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DashboardLayoutRoute from "./layouts/dashboard-layout";
import SignIn from "./routes/signin";
import SignUp from "./routes/signup";
import SetupProfile from "./routes/setup-profile";
import ForgotPassword from "./routes/forgot-password";
import VerifyEmail from "./routes/verify-email";
import ResetPassword from "./routes/reset-password";
import Home from "./routes/home";
import UserProfile from "./routes/userprofile";
import Logout from "./routes/logout";
import PeopleProfile from "./routes/peopleprofile";

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/logout" component={Logout} />
        <DashboardLayoutRoute
          path="/people-profile/:id"
          component={PeopleProfile}
        />
        <DashboardLayoutRoute path="/user-profile" component={UserProfile} />
        <DashboardLayoutRoute path="/home" component={Home} />
        <Route path="/reset-password/:id" component={ResetPassword} />
        <Route path="/verify-email" component={VerifyEmail} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/setup-profile/:id" component={SetupProfile} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Redirect from="/" exact to="/signin" />
      </Switch>
    </React.Fragment>
  );
};

export default App;
