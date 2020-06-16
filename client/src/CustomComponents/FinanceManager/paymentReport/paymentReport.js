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

class PaymentReport extends React.Component {
  constructor(props) {
    super(props);
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
          Payment - <span className="fw-semi-bold">List</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  List of all <span className="fw-semi-bold">Payments</span>
                </h5>
              }
              settings
              close
              bodyClass={s.mainTableWidget}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th>Name</th>
                    <th>Total</th>
                    <th className="hidden-sm-down">Received</th>
                    <th className="hidden-sm-down">Pending</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.data.map((row) => (
                    <tr key={row.id}>
                      <td>{row.name}</td>
                      <td>{row.total}</td>
                      <td>{row.received}</td>
                      <td>{row.pending}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearfix">
                <div className="float-right">
                  <Button color="default" className="mr-xs" size="sm">
                    Back
                  </Button>
                </div>
                <p>List of fees.</p>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PaymentReport;
