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

class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
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
          &nbsp; View
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader
            toggle={this.toggleModal}
            style={{ background: "#ead4c9", color: "black" }}
          >
            <strong>
              <h3 className="display-5">Student Info</h3>
            </strong>
          </ModalHeader>
          <ModalBody style={{ background: "white", color: "black" }}>
            <Row>
              <Col lg={12}>
                <Row>
                  <Col>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup row>
                        <Label htmlFor="id" md={3}>
                          ID
                        </Label>
                        <Label htmlFor="id" md={9}>
                          <h4 className="display-6">{this.props.data._id}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="name" md={3}>
                          Name
                        </Label>
                        <Label htmlFor="name" md={9}>
                          <h4 className="display-6">{this.props.data.Name}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="fatherName" md={3}>
                          Father Name
                        </Label>
                        <Label htmlFor="fathername" md={9}>
                          <h4 className="display-6">
                            {this.props.data.FatherName}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="address" md={3}>
                          Address
                        </Label>
                        <Label htmlFor="address" md={9}>
                          <h4 className="display-6">
                            {this.props.data.Address}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="phone" md={3}>
                          Phone
                        </Label>
                        <Label htmlFor="phone" md={9}>
                          <h4 className="display-6">{this.props.data.Phone}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="dob" md={3}>
                          Date of Birth
                        </Label>
                        <Label htmlFor="dob" md={9}>
                          <h4 className="display-6">{this.props.data.DOB}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="Department" md={3}>
                          Department
                        </Label>
                        <Label htmlFor="department" md={9}>
                          <h4 className="display-6">
                            {this.props.data.Department}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="email" md={3}>
                          Email
                        </Label>
                        <Label htmlFor="email" md={9}>
                          <h4 className="display-6">{this.props.data.Email}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="enrolDate" md={3}>
                          Enrol Date
                        </Label>
                        <Label htmlFor="enrolDate" md={9}>
                          <h4 className="display-6">
                            {this.props.data.EnrolDate}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="enrolDate" md={3}>
                          Class
                        </Label>
                        <Label htmlFor="enrolDate" md={9}>
                          <h4 className="display-6">{this.props.data.Class}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={{ size: 10, offset: 4 }}>
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

export default EditStudent;
