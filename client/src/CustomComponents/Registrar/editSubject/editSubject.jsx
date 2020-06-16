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
import { Form, FormGroup, Input } from "reactstrap";
import axios from "axios";

class EditSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      name: this.props.data.Name,
      code: this.props.data.Code,
      class: this.props.data.Class,
      department: this.props.data.Department,
      faculty: this.props.data.Faculty,
      selectedFaculty: this.props.data.Faculty,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  componentDidMount() {
    axios
      .post("http://localhost:4000/registrar/allfacutly", {})
      .then((res) => {
        this.setState({ ...this.state, faculty: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }
  submitComment(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
  }
  handleSubmit(e) {
    var faculty = [];
    this.state.selectedFaculty.map((e, index) => {
      faculty.push({ ID: e });
    });
    console.log(faculty);
    e.preventDefault();
    axios
      .post("http://localhost:4000/registrar/updatesubject", {
        Name: this.state.name,
        Code: this.state.code,
        Class: this.state.class,
        Faculty: faculty,
        Department: this.state.department,
      })
      .then((res) => {
        this.setState({ ...this.state, client: res.data });
        alert("Subject added successfully.\n");
        this.props.history.push("/registrar/subject/viewall");
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
            <h4>Edit Subject Information</h4>
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
                        <Label htmlFor="code" md={4}>
                          Code
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
                            type="text"
                            id="code"
                            name="code"
                            placeholder={this.props.data.Code}
                            onChange={(e) => {
                              this.setState({
                                ...this.state,
                                code: e.target.value,
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
                            name="department"
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
                            type="tel"
                            id="class"
                            name="class"
                            placeholder={this.props.data.Class}
                            onChange={this.handleInputChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="faculty" md={4}>
                          Faculty
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
                            type="select"
                            id="faculty"
                            name="faculty"
                            onChange={(e) => {
                              var options = e.target.options;
                              var value = [];
                              for (var i = 0, l = options.length; i < l; i++) {
                                if (options[i].selected) {
                                  value.push(options[i].value);
                                }
                              }
                              this.setState({
                                ...this.state,
                                selectedFaculty: value,
                              });
                            }}
                            multiple
                          >
                            {this.state.faculty.map((faculty) => {
                              return (
                                <option value={faculty._id}>
                                  {faculty._id} ({faculty.Name})
                                </option>
                              );
                            })}
                          </Input>
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

export default EditSubject;
