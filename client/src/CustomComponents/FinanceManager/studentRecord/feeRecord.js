import React from "react";
import { Row, Col, Table, Button } from "reactstrap";

import Widget from "../../../components/Widget/Widget";
import s from "./studentList.module.scss";
import EditRecord from "../editRecord/editRecord";

class FeeRecord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recordList: [
        {
          studentID: 1,
          studentName: "",
          department: "",
          class: "",
          Fee: "",
          date: "",
          amount: "",
        },
      ],
    };
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
          Student Fee - <span className="fw-semi-bold">Record</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  List of all <span className="fw-semi-bold">fee records</span>
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
                    <th className="hidden-sm-down">Department</th>
                    <th className="hidden-sm-down">Class</th>
                    <th className="hidden-sm-down">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.recordList.map((row) => (
                    <tr key={row.id}>
                      <td>{row.studentID}</td>
                      <td>{row.studentName}</td>
                      <td>{row.department}</td>
                      <td>{row.class}</td>
                      <td className="text-muted">
                        <div className="row">
                          <EditRecord />
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
                <p>List of all Student</p>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FeeRecord;
