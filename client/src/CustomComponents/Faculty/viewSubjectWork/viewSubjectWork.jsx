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
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, Route, Redirect } from "react-router";

import { Link } from "react-router-dom";
import Widget from "../../../components/Widget/Widget";
import s from "../dashboard/Dashboard.module.scss";
import ViewGrade from "../viewGrade/viewGrade";
import ListSubjectWork from "../listSubjectWork/listSubjectWork";

class ViewSubjectWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fatherName: "",
      dob: Date,
      gender: "",
      address: "",
      gender: "",
      phone: "",
      email: "",
      enrolDate: Date,
      touched: {
        name: false,
        fatherName: false,
        phone: false,
        email: false,
      },
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
    console.log("Current state is: " + JSON.stringify(this.state));
    alert("Current state is: " + JSON.stringify(this.state));
    e.preventDefault();
  }
  handleBlue = (field) => (e) => {
    this.setState({ touched: { ...this.state.touched, [field]: true } });
  };
  validate(name, fatherName, phone, email) {
    const error = {
      name: "",
      fatherName: "",
      phone: "",
      email: "",
    };
    if (this.state.touched.name && name.length < 3) {
      error.name = "First Name shoud be greater than equal to 3";
    } else if (this.state.touched && name.length > 10) {
      error.name = "First Name shoud be less than equal to 10";
    }
    if (this.state.touched.fatherName && fatherName.length < 3) {
      error.fatherName = "Last Name shoud be greater than equal to 3";
    } else if (this.state.touched.fatherName && fatherName.length > 10) {
      error.fatherName = "Last Name shoud be less than equal to 10";
    }

    const reg = /^\d+$/;
    if (this.state.touched.phone && !reg.test(phone)) {
      error.phone = "Tel. Number should contain only number";
    }
    if (
      this.state.touched.email &&
      email.split("").filter((x) => x === "@").length !== 1
    ) {
      error.email = "Email should contain a '@' sign";
    }
    return error;
  }
  render() {
    const errors = this.validate(
      this.state.name,
      this.state.fatherName,
      this.state.phone,
      this.state.email
    );
    return (
      <div className={s.root}>
        <Row>
          <Col lg={10}>
            <Widget title={<h4> Enter detail of student </h4>} close settings>
              <Row>
                <Col>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                      <Label htmlFor="name" md={2}>
                        Name
                      </Label>

                      <Col lg={10}>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          valid={errors.name === ""}
                          invalid={errors.name !== ""}
                          placeholder="Name"
                          value={this.state.name}
                          onChange={this.handleInputChange}
                          onBlur={this.handleBlue("name")}
                        />
                        <FormFeedback>{errors.name}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="fatherName" md={2}>
                        Father Name
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="fatherName"
                          name="fatherName"
                          valid={errors.fatherName === ""}
                          invalid={errors.fatherName !== ""}
                          placeholder="Father Name"
                          value={this.state.fatherName}
                          onChange={this.handleInputChange}
                          onBlur={this.handleBlue("fatherName")}
                        />
                        <FormFeedback>{errors.fatherName}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="address" md={2}>
                        Address
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="address"
                          name="address"
                          placeholder="Address"
                          value={this.state.address}
                          onChange={this.handleInputChange}
                          onBlur={this.handleBlue("address")}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="phone" md={2}>
                        Phone
                      </Label>
                      <Col md={10}>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          valid={errors.phone === ""}
                          invalid={errors.phone !== ""}
                          placeholder="Phone"
                          value={this.state.phone}
                          onChange={this.handleInputChange}
                          onBlur={this.handleBlue("phone")}
                        />
                        <FormFeedback>{errors.phone}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="dob" md={2}>
                        Date of Birth
                      </Label>
                      <Col md={10}>
                        <Input
                          type="date"
                          id="dob"
                          name="dob"
                          placeholder="Date of Birth"
                          value={this.state.dob}
                          onChange={this.handleInputChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="Department" md={2}>
                        Department
                      </Label>
                      <Col md={10}>
                        <Input
                          type="select"
                          name="department"
                          value={this.state.department}
                          onChange={this.handleInputChange}
                        >
                          <option>Science</option>
                          <option>Arts</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="email" md={2}>
                        Email
                      </Label>
                      <Col md={10}>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          valid={errors.email === ""}
                          invalid={errors.email !== ""}
                          placeholder="Email"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                          onBlur={this.handleBlue("email")}
                        />
                        <FormFeedback>{errors.email}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="enrolDate" md={2}>
                        Enrol Date
                      </Label>
                      <Col md={10}>
                        <Input
                          type="date"
                          id="enrolDate"
                          name="enrolDate"
                          placeholder="Enroll Date"
                          onChange={this.handleInputChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md={{ size: 10, offset: 2 }}>
                        <Button type="submit" color="primary">
                          Add Student
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <TransitionGroup>
              <CSSTransition
                key={this.props.location.key}
                classNames="fade"
                timeout={200}
              >
                <Switch>
                  <Route
                    path="/faculty/viewsubjectwork/:subject"
                    exact
                    component={ListSubjectWork}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ViewSubjectWork;
