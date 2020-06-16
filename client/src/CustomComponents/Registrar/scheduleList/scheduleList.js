import React from "react";
import { Row, Col, Table, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import Widget from "../../../components/Widget/Widget";
import s from "./studentList.module.scss";
import EditSchedule from "../editSchedule/editSchedule";
import ViewSchedule from "../viewSchedule/viewSchedule";
import axios from "axios";

class SchduleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
    };
  }
  componentDidMount() {
    axios
      .post("http://localhost:4000/registrar/allschedules", {})
      .then((res) => {
        console.log(res.data);
        this.setState({ ...this.state, schedules: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }
  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Schedule - <span className="fw-semi-bold">List</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  List of all <span className="fw-semi-bold">SCHEDULE</span>
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
                    <th className="hidden-sm-down">Day</th>
                    <th className="hidden-sm-down">Time Slot</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.schedules.map((row) => (
                    <tr key={row.id}>
                      <td>{row.Name}</td>
                      <td>{row.Code}</td>
                      <td>{row.Department}</td>
                      <td>{row.Class}</td>
                      <td>{row.Day}</td>
                      <td>{row.TimeSlot}</td>
                      <td className="text-muted">
                        <div className="row">
                          <EditSchedule {...this.props} data={row} />
                          <ViewSchedule {...this.props} data={row} />
                          <Button
                            color="default"
                            className="btn btn-light border border-dark"
                            onClick={(e) => {
                              axios
                                .post(
                                  "http://localhost:4000/registrar/delschedule",
                                  { id: row._id }
                                )
                                .then((res) => {
                                  alert(
                                    "Schedule has beed deleted successfully."
                                  );
                                  this.props.history.push(
                                    "/registrar/schedule/viewall"
                                  );
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
                <p>List of all Schdule</p>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SchduleList;
