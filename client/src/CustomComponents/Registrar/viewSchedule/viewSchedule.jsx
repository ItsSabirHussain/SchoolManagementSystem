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

class ViewSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
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
    this.props.history.push("/registrar/schedule/viewall");
  }

  handleSubmit(e) {
    console.log("Current state is: " + JSON.stringify(this.state));
    alert("Current state is: " + JSON.stringify(this.state));
    e.preventDefault();
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
          &nbsp; View
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader
            toggle={this.toggleModal}
            style={{ background: "#ead4c9", color: "black" }}
          >
            <strong>
              <h3 className="display-5">Schedule Information</h3>
            </strong>
          </ModalHeader>
          <ModalBody style={{ background: "white", color: "black" }}>
            <Row>
              <Col lg={12}>
                <Row>
                  <Col>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup row>
                        <Label htmlFor="name" md={3}>
                          Name
                        </Label>
                        <Label htmlFor="name" md={9}>
                          <h4 className="display-6">{this.props.data.Name}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="code" md={3}>
                          Code
                        </Label>
                        <Label htmlFor="code" md={9}>
                          <h4 className="display-6">{this.props.data.Code}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="class" md={3}>
                          Class
                        </Label>
                        <Label htmlFor="class" md={9}>
                          <h4 className="display-6">{this.props.data.Class}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="department" md={3}>
                          Department
                        </Label>
                        <Label htmlFor="department" md={9}>
                          <h4 className="display-6">
                            {this.props.data.Department}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="faculty" md={3}>
                          Faculty
                        </Label>
                        <Label htmlFor="faculty" md={9}>
                          <h4 className="display-6">
                            {this.props.data.Faculty}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="day" md={3}>
                          Day
                        </Label>
                        <Label htmlFor="day" md={9}>
                          <h4 className="display-6">{this.props.data.Day}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="time" md={3}>
                          Time
                        </Label>
                        <Label htmlFor="time" md={9}>
                          <h4 className="display-6">
                            {this.props.data.TimeSlot}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={{ size: 10, offset: 3 }}>
                          <Button type="submit" color="primary">
                            Back
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

export default ViewSchedule;
