import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import axios from "axios";
import Widget from "../../../components/Widget/Widget";
import s from "./studentList.module.scss";
import ViewSchedule from "../../Student/viewSchedule/viewScheule";

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schedules: [],
    };
  }
  componentDidMount() {
    console.log(this.props.data);
    axios
      .post("http://localhost:4000/student/schedule", {
        Class: this.props.data.Class,
        Department: this.props.data.Department,
      })
      .then((res) => {
        this.setState({ ...this.state, schedules: res.data });
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
                    <th>Subject Code</th>
                    <th>Subject Name</th>
                    <th className="hidden-sm-down">Day</th>
                    <th className="hidden-sm-down">TimeSlot</th>
                    <th className="hidden-sm-down">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.schedules.map((row) => (
                    <tr key={row.id}>
                      <td>{row.Code}</td>
                      <td>{row.Name}</td>
                      <td>{row.Day}</td>
                      <td>{row.TimeSlot}</td>
                      <td className="text-muted">
                        <div className="row">
                          <ViewSchedule {...this.props} data={row} />
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

export default Schedule;
