import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

/* eslint-disable */
import ErrorPage from "../pages/error";
/* eslint-enable */

import "../styles/theme.scss";
import AdmissionLayoutComponent from "./Layout/AdmissionLayout";
import RegistrarLayoutComponent from "./Layout/RegistrarLayout";
import StudentLayoutComponent from "./Layout/StudentLayout";
import FinanceManagerLayoutComponent from "./Layout/FinanceManagerLayout";
import FacultyLayoutComponent from "./Layout/FacultyLayout";

import Register from "../pages/register";
import Admission from "../pages/login/admission";
import Registrar from "../pages/login/registrar";
import Faculty from "../pages/login/faculty";
import Student from "../pages/login/student";
import FinanceManager from "../pages/login/financemanager";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Redirect to="/admissionlogin" />}
            />
            <Route path="/admission" component={AdmissionLayoutComponent} />
            <Route path="/registrar" component={RegistrarLayoutComponent} />
            <Route path="/faculty" component={FacultyLayoutComponent} />
            <Route path="/student" component={StudentLayoutComponent} />
            <Route
              path="/financemanager"
              component={FinanceManagerLayoutComponent}
            />

            <Route path="/admissionlogin" exact component={Admission} />
            <Route path="/registrarlogin" exact component={Registrar} />
            <Route path="/facultylogin" exact component={Faculty} />

            <Route path="/studentlogin" exact component={Student} />
            <Route
              path="/financemanagerlogin"
              exact
              component={FinanceManager}
            />

            <Route path="/error" exact component={ErrorPage} />
            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
