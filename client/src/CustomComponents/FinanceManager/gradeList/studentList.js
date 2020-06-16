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
import EditStudent from "../editStudent/editStudent";
import ViewStudent from "../viewRecord/viewStudent";

class StudentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [
        {
          id: 1,
          name: "",
          fathername: "",
          address: "",
          dob: new Date(),
          gender: "",
          phone: "",
          email: "",
          department: "",
          enroldate: "",
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
          Student - <span className="fw-semi-bold">List</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  List of all <span className="fw-semi-bold">STUDENTS</span>
                </h5>
              }
              settings
              close
              bodyClass={s.mainTableWidget}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">#</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th className="hidden-sm-down">DOB</th>
                    <th className="hidden-sm-down">Phone</th>
                    <th className="hidden-sm-down">Email</th>
                    <th className="hidden-sm-down">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.students.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.department}</td>
                      <td>{this.parseDate(row.dob)}</td>
                      <td>{row.phone}</td>
                      <td>{row.email}</td>
                      <td className="text-muted">
                        <div className="row">
                          <EditStudent />
                          <ViewStudent
                            data={{
                              name: "Name",
                              fathername: "fathername",
                              address: "Street, City, Region, Country",
                              dob: Date(),
                              enroldate: Date(),
                              email: "email@sample.com",
                              phone: "+923339999988",
                              gender: "Male",
                              department: "Science",
                            }}
                          />
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

export default StudentList;
