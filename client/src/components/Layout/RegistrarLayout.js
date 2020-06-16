import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";
import Dashboard from "../../CustomComponents/Registrar/dashboard/RegistrarDashboard";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/RegistrarSidebar";
import BreadcrumbHistory from "../BreadcrumbHistory/BreadcrumbHistory";
import { openSidebar, closeSidebar } from "../../actions/navigation";
import s from "./Layout.module.scss";
import AddSubject from "../../CustomComponents/Registrar/addSubject/addSubject";
import SubjectList from "../../CustomComponents/Registrar/subjectList/subjectList";
import AddSchedule from "../../CustomComponents/Registrar/addSchedule/addSchedule";
import SchduleList from "../../CustomComponents/Registrar/scheduleList/scheduleList";
import CombileClasses from "../../CustomComponents/Registrar/combineClasses/conbileClasses";

class RegistrarLayout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
  };
  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
  }

  handleSwipe(e) {
    if ("ontouchstart" in window) {
      if (e.direction === 4 && !this.state.chatOpen) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }

      this.setState({ chatOpen: e.direction === 2 });
    }
  }
  componentDidMount() {
    if (!localStorage.getItem("registrarID")) {
      this.props.history.push("/registrarlogin");
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
                      path="/registrar"
                      exact
                      render={() => <Redirect to="/registrar/dashboard" />}
                    />
                    <Route
                      path="/registrar/dashboard"
                      exact
                      component={Dashboard}
                    />
                    <Route
                      path="/registrar/subject/addnew"
                      exact
                      component={AddSubject}
                    />
                    <Route
                      path="/registrar/subject/viewall"
                      exact
                      component={(props) => <SubjectList {...props} />}
                    />
                    <Route
                      path="/registrar/schedule/addnew"
                      exact
                      component={AddSchedule}
                    />
                    <Route
                      path="/registrar/schedule/viewall"
                      exact
                      component={SchduleList}
                    />
                    <Route
                      path="/registrar/combineclass"
                      exact
                      component={CombileClasses}
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

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarPosition: store.navigation.sidebarPosition,
    sidebarVisibility: store.navigation.sidebarVisibility,
  };
}

export default withRouter(connect(mapStateToProps)(RegistrarLayout));
