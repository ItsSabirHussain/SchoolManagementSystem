import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  FormFeedback,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import { Switch, Route, Redirect } from "react-router";
import Report from "../../../CustomComponents/FinanceManager/departmentReport/report";

class GenerateReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      department: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push("/financemanager/report");
  }

  render() {
    return (
      <div>
        <Row>
          <Col lg={5}>
            <Widget title={<h4> Send Fee Reminder </h4>} close settings>
              <Row>
                <Col>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                      <Label htmlFor="criteria" md={2}>
                        Enter Department
                      </Label>

                      <Col lg={8}>
                        <Input
                          type="text"
                          id="criterai"
                          name="criteria"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              department: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </Widget>
          </Col>
          <Col lg={5}>
            <Widget title={<h4> Send Fee Reminder </h4>} close settings>
              <Row>
                <Col>
                  <Switch>
                    <Route
                      path="/financemanager/report"
                      exact
                      component={() => <Report data={this.state.department} />}
                    />
                  </Switch>
                </Col>
              </Row>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GenerateReport;
