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
import axios from "axios";

class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      name: this.props.data.Name,
      fatherName: this.props.data.FatherName,
      dob: this.props.data.DOB,
      gender: this.props.data.Geneder,
      address: this.props.data.Address,
      phone: this.props.data.Phone,
      email: this.props.data.Email,
      enrolDate: this.props.data.EnrolDate,
      department: this.props.data.Department,
      class: this.props.data.Class,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/admin/updatestudent", {
        id: this.props.data.id,
        Name: this.state.name,
        FatherName: this.state.fatherName,
        DOB: this.state.dob,
        Gender: this.state.gender,
        Address: this.state.address,
        Email: this.state.email,
        Phone: this.state.phone,
        Password: this.state.password,
        Department: this.state.department,
        Class: this.state.class,
      })
      .then((res) => {
        this.props.history.push("/admission/student/viewall");
        alert("Student has been updated successfully.\n");
      })
      .catch((error) => {
        alert(error);
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
                            placeholder={this.props.data.Name}
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
                            placeholder={this.props.data.FatherName}
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
                            placeholder={this.props.data.Address}
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
                            placeholder={this.props.data.Phone}
                            onChange={(e) => {
                              this.setState({
                                ...this.state,
                                Phone: e.target.value,
                              });
                            }}
                          />
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
                            onChange={(e) => {
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
                            placeholder={this.props.data.Email}
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
                        <Label htmlFor="email" md={4}>
                          Class
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
                            type="text"
                            id="email"
                            name="email"
                            placeholder={this.props.data.Email}
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

export default EditStudent;
