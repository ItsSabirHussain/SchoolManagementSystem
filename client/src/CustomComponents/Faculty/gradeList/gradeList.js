import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "./studentList.module.scss";
import EditGrade from "../../Faculty/editGrade/editGrade";
import axios from "axios";
class GradeList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grades: [],
    };
  }

  componentDidMount() {
    axios
      .post("http://localhost:4000/faculty/allgrades", {
        FacultyID: this.props.data._id,
      })
      .then((res) => {
        this.setState({ ...this.state, grades: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Grades - <span className="fw-semi-bold">List</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  List of all{" "}
                  <span className="fw-semi-bold">STUDENTS Grades</span>
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
                    <th className="hidden-sm-down">Subject</th>
                    <th className="hidden-sm-down">Marks</th>
                    <th className="hidden-sm-down">Obtained</th>
                    <th className="hidden-sm-down">Grade</th>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.grades.map((row) => (
                    <tr key={row.id}>
                      <td>{row.StudentID}</td>
                      <td>{row.Code}</td>
                      <td>{row.Marks}</td>
                      <td>{row.Sbtained}</td>
                      <td>{row.Grade}</td>
                      <td className="text-muted">
                        <div className="row">
                          <EditGrade {...this.props} data={row} />
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

export default GradeList;
