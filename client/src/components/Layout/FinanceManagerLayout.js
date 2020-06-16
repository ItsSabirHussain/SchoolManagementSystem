import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/FinanceManagerSidebar";
import BreadcrumbHistory from "../BreadcrumbHistory/BreadcrumbHistory";
import s from "./Layout.module.scss";
import PaymentList from "../../CustomComponents/FinanceManager/paymentList/paymentList";
import FinanceManagerDashboard from "../../CustomComponents/FinanceManager/dashboard/FinanceManagerDashboard";
import SendReminder from "../../CustomComponents/FinanceManager/sendReminder/sendReminder";
import ProvideFeeDiscount from "../../CustomComponents/FinanceManager/provideFeeDiscount/provideFeeDiscount";
import FeeRecord from "../../CustomComponents/FinanceManager/studentRecord/feeRecord";
import GenerateReport from "../../CustomComponents/FinanceManager/generateReport/generateReport";

class FinanceManagerLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!localStorage.getItem("financeID")) {
      this.props.history.push("/financemanagerlogin");
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
                      path="/financemanager"
                      exact
                      render={() => <Redirect to="/financemanager/dashboard" />}
                    />
                    <Route
                      path="/financemanager/dashboard"
                      exact
                      component={FinanceManagerDashboard}
                    />
                    <Route
                      path="/financemanager/paymentlist"
                      exact
                      component={PaymentList}
                    />

                    <Route
                      path="/financemanager/sendfeereminder"
                      exact
                      component={SendReminder}
                    />
                    <Route
                      path="/financemanager/providefeediscount"
                      exact
                      component={ProvideFeeDiscount}
                    />
                    <Route
                      path="/financemanager/feerecord"
                      exact
                      component={FeeRecord}
                    />
                    <Route
                      path="/financemanager/generatepaymentreport"
                      exact
                      component={GenerateReport}
                    />
                    <Route
                      path="/financemanager/report"
                      exact
                      component={GenerateReport}
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

export default FinanceManagerLayout;
