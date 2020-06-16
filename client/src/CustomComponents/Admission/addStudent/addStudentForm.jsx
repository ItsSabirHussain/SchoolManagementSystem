import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "../dashboard/Dashboard.module.scss";
import axios from "axios";

class AddStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fatherName: "",
      dob: "",
      gender: "",
      address: "",
      phone: "",
      email: "",
      enrolDate: "",
      password: "",
      department: "",
      class: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/admin/addstudent", {
        Name: this.state.name,
        FatherName: this.state.fatherName,
        DOB: this.state.dob,
        Gender: this.state.gender,
        Address: this.state.address,
        Email: this.state.email,
        Phone: this.state.phone,
        EnrolDate: this.state.enrolDate,
        Password: this.state.password,
        Department: this.state.department,
        Class: this.state.class,
      })
      .then((res) => {
        this.setState({ ...this.state, client: res.data });
        alert("Student has been updated successfully.\n");
        this.props.history.push("/admission/student/addnew");
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
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
                          placeholder="Name"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              name: e.target.value,
                            });
                          }}
                        />
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
                          placeholder="Father Name"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              fatherName: e.target.value,
                            });
                          }}
                        />
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
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              address: e.target.value,
                            });
                          }}
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
                          placeholder="Phone"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              phone: e.target.value,
                            });
                          }}
                        />
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
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              dob: e.target.value,
                            });
                          }}
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
                          onChange={(e) => {
                            console.log(e.target.value);
                            this.setState({
                              ...this.state,
                              department: e.target.value,
                            });
                          }}
                        >
                          <option value="Science">Science</option>
                          <option value="Arts">Arts</option>
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
                          placeholder="Email"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              email: e.target.value,
                            });
                          }}
                        />
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
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              enrolDate: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label htmlFor="enrolDate" md={2}>
                        Class
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="enrolDate"
                          name="enrolDate"
                          placeholder="Enroll Date"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              class: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label htmlFor="password" md={2}>
                        Passworsd
                      </Label>
                      <Col md={10}>
                        <Input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Password"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              password: e.target.value,
                            });
                          }}
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
      </div>
    );
  }
}

export default AddStudentForm;
