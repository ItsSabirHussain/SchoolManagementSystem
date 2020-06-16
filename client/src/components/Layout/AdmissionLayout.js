import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/AdmissionSidebar";
import BreadcrumbHistory from "../BreadcrumbHistory/BreadcrumbHistory";
import s from "./Layout.module.scss";
import AddStudentForm from "../../CustomComponents/Admission/addStudent/addStudentForm";
import StudentList from "../../CustomComponents/Admission/studetstList";
import FeeAidList from "../../CustomComponents/Admission/feeAidList";
import AdmissionDashboard from "../../CustomComponents/Admission/dashboard/AdmissionDashboard";

class AdmissionLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!localStorage.getItem("adminID")) {
      this.props.history.push("/admissionlogin");
    }
  }
  render() {
    return (
      <div
        className={[
          s.root,
          "sidebar-" + this.props.sidebarPosition,
          "sidebar-" + this.props.sidebarVisibility,
        ].join(" ")}
      >
        <div className={s.wrap}>
          <Header />
          {/* <Chat chatOpen={this.state.chatOpen} /> */}
          {/* <Helper /> */}
          <Sidebar />
          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <BreadcrumbHistory url={this.props.location.pathname} />
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    <Route
                      path="/admission"
                      exact
                      render={() => <Redirect to="/admission/dashboard" />}
                    />
                    <Route
                      path="/admission/dashboard"
                      exact
                      component={AdmissionDashboard}
                    />
                    <Route
                      path="/admission/student/addnew"
                      exact
                      component={AddStudentForm}
                    />
                    <Route
                      path="/admission/student/viewall"
                      exact
                      component={StudentList}
                    />
                    <Route
                      path="/admission/student/viewfeeaid"
                      exact
                      component={FeeAidList}
                    />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              <footer className={s.contentFooter}>
                School Management System
              </footer>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

export default AdmissionLayout;
