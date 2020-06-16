import React from "react";
import { Row, Col, Table, Button } from "reactstrap";

import Widget from "../../../components/Widget/Widget";
import s from "./studentList.module.scss";
import ViewGrade from "../viewGrade/viewGrade";
import axios from "axios";

class ListSubject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
    };
  }

  componentDidMount() {
    console.log(this.props.data);
    axios
      .post("http://localhost:4000/student/enrolledsubjects", {
        id: this.props.data._id,
      })
      .then((res) => {
        this.setState({ ...this.state, subjects: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Student - <span className="fw-semi-bold">Subjects List</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  List of all
                  <span className="fw-semi-bold">Enrolled Courses</span>
                </h5>
              }
              settings
              close
              bodyClass={s.mainTableWidget}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th>Subject ID</th>
                    <th>Subject Name</th>
                    <th className="hidden-sm-down">Class</th>
                    <th className="hidden-sm-down">Department</th>
                    <th className="hidden-sm-down">Faculty</th>
                    <th className="hidden-sm-down">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.subjects.map((row) => (
                    <tr key={row._id}>
                      <td>{row.Code}</td>
                      <td>{row.Name}</td>
                      <td>{row.Class}</td>
                      <td>{row.Department}</td>
                      <td>{row.Faculty}</td>
                      <td className="text-muted">
                        <div className="row">
                          <ViewGrade {...this.props} data={row} />
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

export default ListSubject;
