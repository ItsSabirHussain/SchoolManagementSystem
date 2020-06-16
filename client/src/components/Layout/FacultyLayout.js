import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/FacultySidebar";
import BreadcrumbHistory from "../BreadcrumbHistory/BreadcrumbHistory";
import s from "./Layout.module.scss";
import AddStudentForm from "../../CustomComponents/Admission/addStudent/addStudentForm";
import StudentList from "../../CustomComponents/Admission/studetstList/studentList";
import FeeAidList from "../../CustomComponents/Admission/feeAidList/feeAidList";
import FacultyDashboard from "../../CustomComponents/Faculty/dashboard/FacultyDashboard";
import AddGrade from "../../CustomComponents/Faculty/addGrade/addGrade";
import EditGrade from "../../CustomComponents/Faculty/editGrade/editGrade";
import GradeList from "../../CustomComponents/Faculty/gradeList/gradeList";
import axios from "axios";
class FacultyLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("facultyID")) {
      this.props.history.push("/facultyID");
    }
    console.log(localStorage.getItem("facultyID"));
    axios
      .post("http://localhost:4000/faculty/faculty", {
        id: localStorage.getItem("facultyID"),
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
                      path="/faculty"
                      exact
                      render={() => <Redirect to="/faculty/dashboard" />}
                    />
                    <Route
                      path="/faculty/dashboard"
                      exact
                      component={(props) => (
                        <FacultyDashboard {...props} data={this.state.data} />
                      )}
                    />
                    <Route
                      path="/faculty/addgrade"
                      exact
                      component={(props) => (
                        <AddGrade {...props} data={this.state.data} />
                      )}
                    />
                    <Route
                      path="/faculty/editgrade"
                      exact
                      component={(props) => (
                        <GradeList {...props} data={this.state.data} />
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

export default FacultyLayout;
