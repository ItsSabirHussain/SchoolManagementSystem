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

class EditGrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: this.props.data.Grade,
      marks: this.props.data.Marks,
      obtained: this.props.data.Obtained,
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
      .post("http://localhost:4000/faculty/updategrade", {
        id: this.props.data._id,
        Marks: this.state.marks,
        Obtained: this.state.obtained,
        Grade: this.state.grade,
      })
      .then((res) => {
        this.props.history.push("/faculty/editgrade");
        alert("Grade have been updated successfully.\n");
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
            <h4>Edit Student Grade</h4>
          </ModalHeader>
          <ModalBody style={{ background: "white", color: "black" }}>
            <Row>
              <Col lg={12}>
                <Row>
                  <Col>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup row>
                        <Label htmlFor="marks" md={2}>
                          Marks
                        </Label>
                        <Col md={10}>
                          <Input
                            type="text"
                            id="marks"
                            name="marks"
                            placeholder={this.props.data.Marks}
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
                            placeholder={this.props.data.Obtained}
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
                            placeholder={this.props.data.Grade}
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

export default EditGrade;
