import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
  Label,
  Table,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import { Form, FormGroup } from "reactstrap";

class EditSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      faculty: "",
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
    this.props.history.push("/registrar/schedule/viewall");
    e.preventDefault();
  }
  componentDidMount() {
    var tmp = "";
    this.props.data.Faculty.map((e) => {
      tmp = tmp + " " + e["ID"];
    });
    this.setState({ ...this.state, faculty: tmp });
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
              <h3 className="display-5">Subject Info</h3>
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
                        <Col md={9}>
                          <Table striped>
                            <thead>
                              <tr>
                                <th>ID</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.props.data.Faculty.map((e) => {
                                return (
                                  <tr>
                                    <td>{e.ID}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </Col>
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

export default EditSubject;
