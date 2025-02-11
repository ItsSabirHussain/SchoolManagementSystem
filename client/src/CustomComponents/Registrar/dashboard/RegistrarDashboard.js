import React from "react";
import { Row, Col } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "./Dashboard.module.scss";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      checkedArr: [false, false, false],
      userName: "Name of User",
    };
    this.checkTable = this.checkTable.bind(this);
  }

  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">Welcome to REGISTRAR Dashboard &nbsp;</h1>

        <Row>
          <Col lg={5}>
            {" "}
            <Widget title={<h5> Personal Information </h5>} close settings>
              <Row>
                <Col lg={4}>
                  <h5>ID:</h5>
                </Col>
                <Col lg={8}>
                  <h5>REGISTRAR/sms/01</h5>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h5> EmaIL:</h5>
                </Col>
                <Col lg={8}>
                  <h5>registrar@schoolmanagementsystem.com</h5>
                </Col>
              </Row>
            </Widget>
          </Col>
        </Row>
        <Row></Row>
      </div>
    );
  }
}

export default Dashboard;
