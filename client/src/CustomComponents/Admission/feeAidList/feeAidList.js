import React from "react";
import { Row, Col, Table, Button } from "reactstrap";

import Widget from "../../../components/Widget/Widget";
import s from "./feeAidList.module.scss";
import axios from "axios";

class FeeAidList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feeaiddetails: [],
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
      .post("http://localhost:4000/admin/feeaid", {})
      .then((res) => {
        console.log(res.data);
        this.setState({ ...this.state, feeaiddetails: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Fee & Aid - <span className="fw-semi-bold">Details</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  Fee & Aid <span className="fw-semi-bold">DETAILS</span>
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
                    <th className="hidden-sm-down">Total Fee</th>
                    <th className="hidden-sm-down">Aid</th>
                    <th className="hidden-sm-down">Paid</th>
                    <th className="hidden-sm-down">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.feeaiddetails.map((row) => (
                    <tr key={row.id}>
                      <td>{row.StudentID}</td>
                      <td>{row.Name}</td>
                      <td>{row.Department}</td>
                      <td>{row.TotalFee}</td>
                      <td>{row.Aid}</td>
                      <td>{row.Paid}</td>
                      <td>{row.TotalFee - row.Aid - row.Paid}</td>
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
                <p>Fee and Aid Details</p>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FeeAidList;
