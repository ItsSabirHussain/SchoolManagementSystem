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
import SelectFaculty from "../selectFaculty/SelectFaculty";
import axios from "axios";

class EnrolSubject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjectList: [],
      data: {},
    };
  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("en-us", { month: "long" })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
  }

  componentDidMount() {
    console.log(this.props.data);
    axios
      .post("http://localhost:4000/student/availablesubjects", {
        Department: this.props.data.Department,
        Class: this.props.data.Class,
      })
      .then((res) => {
        this.setState({ ...this.state, subjectList: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Student - <span className="fw-semi-bold">For Enroll</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  List of all{" "}
                  <span className="fw-semi-bold">Available Courses</span>
                </h5>
              }
              settings
              close
              bodyClass={s.mainTableWidget}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th>Subject Code</th>
                    <th>Suject Name</th>
                    <th className="hidden-sm-down">Class</th>
                    <th className="hidden-sm-down">Department</th>
                    <th className="hidden-sm-down">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.subjectList.map((row) => {
                    return (
                      <tr key={row.id}>
                        <td>{row.Code}</td>
                        <td>{row.Name}</td>
                        <td>{row.Class}</td>
                        <td>{row.Department}</td>
                        <td>
                          <SelectFaculty
                            {...this.props}
                            data={{
                              faculty: row.Faculty,
                              subject: row,
                              studentID: this.props.data._id,
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
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

export default EnrolSubject;
