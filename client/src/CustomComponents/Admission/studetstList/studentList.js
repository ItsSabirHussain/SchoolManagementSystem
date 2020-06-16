import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import Widget from "../../../components/Widget/Widget";
import s from "./studentList.module.scss";
import EditStudent from "../editStudent/editStudent";
import ViewStudent from "../viewStudent/viewStudent";

class StudentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
    };
  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("en-us", { month: "long" })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
  }

  componentDidMount() {
    axios
      .post("http://localhost:4000/admin/allstudents", {})
      .then((res) => {
        console.log(res.data);
        this.setState({ ...this.state, students: res.data });
      })
      .catch((error) => {
        alert(error);
      });
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
                      <td>{row.Name}</td>
                      <td>{row.Department}</td>
                      <td>{row.DOB}</td>
                      <td>{row.Phone}</td>
                      <td>{row.Email}</td>
                      <td className="text-muted">
                        <div className="row">
                          <EditStudent {...this.props} data={row} />
                          <ViewStudent {...this.props} data={row} />
                          <Button
                            color="default"
                            className="btn btn-light border border-dark"
                            onClick={(e) => {
                              e.preventDefault();
                              axios
                                .post(
                                  "http://localhost:4000/admin/delstudent",
                                  {
                                    id: row._id,
                                  }
                                )
                                .then((res) => {
                                  alert(
                                    "Student has been deleted successfully.\n"
                                  );
                                  this.props.history.push(
                                    "/admission/student/viewall"
                                  );
                                })
                                .catch((error) => {
                                  alert(error);
                                });
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faPencilAlt}
                            ></FontAwesomeIcon>
                            &nbsp; Delete
                          </Button>
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
