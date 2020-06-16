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
import GradeList from "../gradeList/gradeList";
import axios from "axios";
class AddGrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: "",
      subject: "",
      marks: "",
      obtained: "",
      grade: "",
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
    axios
      .post("http://localhost:4000/faculty/addgrade", {
        StudentID: this.state.studentID,
        Code: this.state.subject,
        Marks: this.state.marks,
        Obtained: this.state.obtained,
        Grade: this.state.grade,
      })
      .then((res) => {
        this.props.history.push("/faculty/addgrade");
        alert("Marks have been added successfully.\n");
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
            <Widget title={<h4> Enter Grade Detail</h4>} close settings>
              <Row>
                <Col>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                      <Label htmlFor="studentID" md={2}>
                        Student ID
                      </Label>

                      <Col lg={10}>
                        <Input
                          type="text"
                          id="studentID"
                          name="studentID"
                          placeholder="Student ID"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              studentID: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label htmlFor="subject" md={2}>
                        Subject Code
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="subject"
                          name="subject"
                          placeholder="Subject"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              subject: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="marks" md={2}>
                        Marks
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="marks"
                          name="marks"
                          placeholder="Marks"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              marks: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="obtained" md={2}>
                        Obtained
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="obtained"
                          name="obtained"
                          placeholder="Obtained"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              obtained: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="grade" md={2}>
                        Grade
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          name="grade"
                          placeholder="Grade"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              grade: e.target.value,
                            });
                          }}
                        ></Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md={{ size: 10, offset: 2 }}>
                        <Button type="submit" color="primary">
                          Add Grade
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

export default AddGrade;
