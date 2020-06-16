import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import axios from "axios";
import Widget from "../../../components/Widget/Widget";
import s from "./studentList.module.scss";

class FeeHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feeHistory: [],
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
      .post("http://localhost:4000/student/feehistory", {
        ID: this.props.data._id,
      })
      .then((res) => {
        this.setState({ ...this.state, feeHistory: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Student - <span className="fw-semi-bold">Fee History</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  List of all <span className="fw-semi-bold">Fee History</span>
                </h5>
              }
              settings
              close
              bodyClass={s.mainTableWidget}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">Date</th>

                    <th className="hidden-sm-down">Month</th>
                    <th className="hidden-sm-down">Fee</th>
                    <th className="hidden-sm-down">Paid</th>
                    <th className="hidden-sm-down">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.feeHistory.map((row) => (
                    <tr key={row._id}>
                      <td>{row.Date}</td>

                      <td>{row.Month}</td>
                      <td>{row.TotalFee}</td>
                      <td>{row.Paid}</td>
                      <td>{row.Status}</td>
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
                <p>List of all fee history</p>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FeeHistory;
