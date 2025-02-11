import React from "react";
import { Row, Col } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "./Dashboard.module.scss";

class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      checkedArr: [false, false, false],
      userName: "",
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
        <h1 className="page-title">
          Welcome &nbsp;
          <small>
            <small>{this.state.userName}</small>
          </small>
        </h1>

        <Row>
          <Col lg={5}>
            <Widget
              title={<h3 className="display-5"> Personal Information </h3>}
              close
              settings
            >
              <Row>
                <Col lg={4}>
                  <h3 className="display-5">Name:</h3>
                </Col>
                <Col lg={8}>
                  <h3 className="display-5">{this.props.data.Name}</h3>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h3 className="display-5">ID</h3>
                </Col>
                <Col lg={8}>
                  <h3 className="display-5">{this.props.data._id}</h3>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h3 className="display-5">Email</h3>
                </Col>
                <Col lg={8}>
                  <h3 className="display-5">{this.props.data.Email}</h3>
                </Col>
              </Row>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default StudentDashboard;
