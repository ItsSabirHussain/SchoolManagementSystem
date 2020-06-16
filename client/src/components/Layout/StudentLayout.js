import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/StudentSidebar";
import BreadcrumbHistory from "../BreadcrumbHistory/BreadcrumbHistory";
import s from "./Layout.module.scss";
import AddStudentForm from "../../CustomComponents/Admission/addStudent/addStudentForm";
import StudentList from "../../CustomComponents/Admission/studetstList/studentList";
import FeeAidList from "../../CustomComponents/Admission/feeAidList/feeAidList";
import StudentDashboard from "../../CustomComponents/Student/dashboard/AdmissionDashboard";
import EnrolSubject from "../../CustomComponents/Student/enrolSubject/enrolSubject";
import ListSubject from "../../CustomComponents/Student/listSubject/listSubject";
import Schedule from "../../CustomComponents/Student/schedule/schedule";
import FeeHistory from "../../CustomComponents/Student/feeHistory/feeHistory";
import PayFee from "../../CustomComponents/Student/payFee/payFee";
import axios from "axios";

class StudentLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    if (!localStorage.getItem("studentID")) {
      this.props.history.push("/studentlogin");
    }
    console.log(localStorage.getItem("studentID"));
    axios
      .post("http://localhost:4000/student/student", {
        id: localStorage.getItem("studentID"),
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ ...this.state, data: res.data });
      })
      .catch((error) => {
        alert(error);
      });
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
                      path="/student"
                      exact
                      render={() => <Redirect to="/student/dashboard" />}
                    />
                    <Route
                      path="/student/dashboard"
                      exact
                      component={(props) => (
                        <StudentDashboard {...props} data={this.state.data} />
                      )}
                    />
                    <Route
                      path="/student/subjects/enrolsubject"
                      exact
                      component={(props) => (
                        <EnrolSubject {...props} data={this.state.data} />
                      )}
                    />
                    <Route
                      path="/student/subjects/listsubjects"
                      exact
                      component={(props) => (
                        <ListSubject {...props} data={this.state.data} />
                      )}
                    />
                    <Route
                      path="/student/schedule"
                      exact
                      component={(props) => (
                        <Schedule {...props} data={this.state.data} />
                      )}
                    />
                    <Route
                      path="/student/feehistory"
                      exact
                      component={(props) => (
                        <FeeHistory {...props} data={this.state.data} />
                      )}
                    />

                    <Route
                      path="/student/payfee"
                      exact
                      component={(props) => (
                        <PayFee {...props} data={this.state.data} />
                      )}
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

export default StudentLayout;
