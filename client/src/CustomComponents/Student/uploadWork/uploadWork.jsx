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

import { Form, FormGroup, Input, FormFeedback } from "reactstrap";
import Widget from "../../../components/Widget/Widget";

class UploadWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
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
      <div>
        <Button
          color="default"
          className="btn btn-light border border-dark"
          onClick={this.toggleModal}
        >
          <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
          &nbsp; Edit
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
                        <Label htmlFor="name" md={4}>
                          Name
                        </Label>

                        <Col lg={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
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
                        <Label htmlFor="fatherName" md={4}>
                          Father Name
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
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
                        <Label htmlFor="address" md={4}>
                          Address
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
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
                        <Label htmlFor="phone" md={4}>
                          Phone
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
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
                        <Label htmlFor="dob" md={4}>
                          Date of Birth
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
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
                        <Label htmlFor="Department" md={4}>
                          Department
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
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
                        <Label htmlFor="email" md={4}>
                          Email
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
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
                        <Label htmlFor="enrolDate" md={4}>
                          Enrol Date
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
                            type="date"
                            id="enrolDate"
                            name="enrolDate"
                            placeholder="Enroll Date"
                            onChange={this.handleInputChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={{ size: 10, offset: 4 }}>
                          <Button type="submit" color="primary">
                            Submit
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

export default UploadWork;
