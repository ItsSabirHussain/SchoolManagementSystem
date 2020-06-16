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
      paymentList: [],
    };
  }

  componentDidMount() {
    axios
      .post("http://localhost:4000/financemanager/allfees", {})
      .then((res) => {
        this.setState({ ...this.state, paymentList: res.data });
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
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th className="hidden-sm-down">Month</th>
                    <th className="hidden-sm-down">Fee</th>
                    <th className="hidden-sm-down">Paid Ammount</th>
                    <th className="hidden-sm-down">Status</th>

                    <th className="hidden-sm-down">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.paymentList.map((row) => (
                    <tr key={row._id}>
                      <td>{row.StudentID}</td>
                      <td>{row.Name}</td>
                      <td>{row.Month}</td>
                      <td>{row.TotalFee}</td>
                      <td>{row.Paid}</td>
                      <td>{row.Paid - row.TotalFee}</td>

                      <td className="text-muted">
                        <div className="row">
                          <EditRecord {...this.props} data={row} />
                        </div>
                      </td>
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
                <p>List of fee.</p>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PaymentList;
