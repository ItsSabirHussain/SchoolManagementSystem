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
import { Form, FormGroup, Input, FormFeedback } from "reactstrap";

class EditRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      studentID: this.props.data.StudentID,
      name: this.props.data.Name,
      department: this.props.data.Department,
      totalFee: this.props.data.TotalFee,
      class: this.props.data.Class,
      paid: this.props.data.Paid,
      aid: this.props.data.Aid,
      month: this.props.data.Month,
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
      .post("http://localhost:4000/financemanager/updatefee", {
        Name: this.state.name,
        StudentID: this.state.studentID,
        Department: this.state.department,
        Class: this.state.class,
        TotalFee: this.state.totalFee,
        Aid: this.state.aid,
        Paid: this.state.paid,
        Month: this.state.month,
      })
      .then((res) => {
        this.props.history.push("/financemanager/paymentlist");
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
          &nbsp; Edit & View
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader
            toggle={this.toggleModal}
            style={{ background: "#ead4c9", color: "black" }}
          >
            <h4>Edit Fee Information</h4>
          </ModalHeader>
          <ModalBody style={{ background: "white", color: "black" }}>
            <Row>
              <Col lg={12}>
                <Row>
                  <Col>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup row>
                        <Label htmlFor="studentID" md={4}>
                          Student ID
                        </Label>

                        <Col lg={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
                            type="text"
                            id="studentID"
                            name="studentID"
                            placeholder={this.props.data.StudentID}
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
                        <Label htmlFor="studentName" md={4}>
                          Student Name
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
                            type="text"
                            id="studentName"
                            name="studentName"
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
                        <Label htmlFor="month" md={4}>
                          Month
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
                            type="text"
                            id="month"
                            name="month"
                            placeholder={this.props.data.Month}
                            onChange={(e) => {
                              this.setState({
                                ...this.state,
                                month: e.target.value,
                              });
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="department" md={4}>
                          Department
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
                            type="text"
                            id="department"
                            name="departmnet"
                            placeholder={this.props.data.Department}
                            onChange={(e) => {
                              this.setState({
                                ...this.state,
                                department: e.target.value,
                              });
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="class" md={4}>
                          Class
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
                            type="text"
                            id="class"
                            name="class"
                            placeholder={this.props.data.Class}
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
                        <Label htmlFor="Fee" md={4}>
                          Fee
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
                            type="text"
                            name="fee"
                            placeholder={this.props.data.TotalFee}
                            onChange={(e) => {
                              this.setState({
                                ...this.state,
                                totalFee: e.target.value,
                              });
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="amount" md={4}>
                          Paid
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
                            type="text"
                            id="amount"
                            name="amount"
                            placeholder={this.props.data.Paid}
                            onChange={(e) => {
                              this.setState({
                                ...this.state,
                                paid: e.target.value,
                              });
                            }}
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label htmlFor="amount" md={4}>
                          Aid
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
                            type="text"
                            id="amount"
                            name="amount"
                            placeholder={this.props.data.Aid}
                            onChange={(e) => {
                              this.setState({
                                ...this.state,
                                aid: e.target.value,
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

export default EditRecord;
