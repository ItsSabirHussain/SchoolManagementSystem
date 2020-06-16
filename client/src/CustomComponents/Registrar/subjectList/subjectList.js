import React from "react";
import { Row, Col, Table, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import Widget from "../../../components/Widget/Widget";
import s from "./studentList.module.scss";
import EditSubject from "../editSubject/editSubject";
import ViewSubject from "../viewSubject/viewSubject";
import axios from "axios";
import { withRouter } from "react-router-dom";

class SubjectList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
    };
  }

  componentDidMount() {
    axios
      .post("http://localhost:4000/registrar/allsubjects", {})
      .then((res) => {
        console.log(res.data);
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
          Subjects - <span className="fw-semi-bold">List</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  List of all <span className="fw-semi-bold">SUBJECTS</span>
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
                    <th>Code</th>
                    <th className="hidden-sm-down">Department</th>
                    <th className="hidden-sm-down">Class</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.subjects.map((row) => (
                    <tr key={row._id}>
                      <td>{row.Name}</td>
                      <td>{row.Code}</td>
                      <td>{row.Department}</td>
                      <td>{row.Class}</td>
                      <td className="text-muted">
                        <div className="row">
                          <EditSubject {...this.props} data={row} />
                          <ViewSubject {...this.props} data={row} />
                          <Button
                            color="default"
                            className="btn btn-light border border-dark"
                            onClick={(e) => {
                              axios
                                .post(
                                  "http://localhost:4000/registrar/delsubject",
                                  { id: row._id }
                                )
                                .then((res) => {
                                  alert("Record deleted succcessfully.");
                                  this.props.history.push(
                                    "/registrar/subject/viewall"
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

export default withRouter(SubjectList);
