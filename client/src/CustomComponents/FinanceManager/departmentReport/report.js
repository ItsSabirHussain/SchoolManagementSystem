import React from "react";
import {
  Row,
  Col,
  Table,
  Button,
  ModalHeader,
  Modal,
  ModalFooter,
  ModalBody,
} from "reactstrap";

import Widget from "../../../components/Widget/Widget";
import s from "./studentList.module.scss";
import EditRecord from "../editRecord/editRecord";
import axios from "axios";

class PaymentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    console.log(this.props.data);
    axios
      .post("http://localhost:4000/financemanager/report", {
        Department: this.props.data,
      })
      .then((res) => {
        this.setState({ ...this.state, data: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }
  parseDate(date) {
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("en-us", { month: "long" })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Report - <span className="fw-semi-bold">List</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  Sum of <span className="fw-semi-bold">Payments</span>
                </h5>
              }
              settings
              close
              bodyClass={s.mainTableWidget}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Aid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.data.Total}</td>
                    <td>{this.state.data.Paid}</td>
                    <td>{this.state.data.Aid}</td>
                  </tr>
                </tbody>
              </Table>
              <div className="clearfix"></div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PaymentList;
