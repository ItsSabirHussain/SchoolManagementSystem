import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
  Label,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { Form, FormGroup, Input } from "reactstrap";

class SelectFaculty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  submitComment(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
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
      .post("http://localhost:4000/student/enrollsubject", {
        Name: this.props.data.subject.Name,
        Code: this.props.data.subject.Code,
        Class: this.props.data.subject.Class,
        Department: this.props.data.subject.Department,
        StudentID: this.props.data.studentID,
        Faculty: this.state.faculty,
      })
      .then((res) => {
        alert("Enrolled successfully.");
        this.props.history.push("/student/subjects/enrolsubject");
      })
      .catch((error) => {
        alert("Already Enrolled.");
        this.props.history.push("/student/subjects/enrolsubject");
      });
  }
  render() {
    return (
      <div>
        <Button
          color="default"
          className="btn btn-light border border-dark"
          onClick={this.toggleModal}
        >
          <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
          &nbsp; Enroll
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader
            toggle={this.toggleModal}
            style={{ background: "#ead4c9", color: "black" }}
          >
            <h4>Edit Student Information</h4>
          </ModalHeader>
          <ModalBody style={{ background: "white", color: "black" }}>
            <Row>
              <Col lg={12}>
                <Row>
                  <Col>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup row>
                        <Label htmlFor="faculty" md={4}>
                          Select Faculty
                        </Label>
                        <Col lg={8}>
                          <Input
                            type="select"
                            id="class"
                            name="class"
                            onChange={(e) => {
                              var options = e.target.options;
                              var value = "";
                              for (var i = 0, l = options.length; i < l; i++) {
                                if (options[i].selected) {
                                  console.log(options[i].value);
                                  value = options[i].value;
                                }
                              }
                              this.setState({
                                ...this.state,
                                faculty: value,
                              });
                            }}
                          >
                            {this.props.data.faculty.map((faculty) => {
                              return (
                                <option value={faculty.ID}>{faculty.ID}</option>
                              );
                            })}
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={{ size: 10, offset: 4 }}>
                          <Button type="submit" color="primary">
                            Enroll
                          </Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default SelectFaculty;
