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

class EditSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      name: this.props.data.Name,
      code: this.props.data.Code,
      class: this.props.data.Class,
      department: this.props.data.Department,
      faculty: [],
      selectedFaculty: this.props.data.Faculty,
      day: this.props.data.Day,
      timeslot: this.props.data.TimeSlot,
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
    var faculty = this.state.selectedFaculty;
    axios
      .post("http://localhost:4000/registrar/updateschedule", {
        Name: this.state.name,
        Code: this.state.code,
        Class: this.state.class,
        Faculty: faculty,
        Department: this.state.department,
        Day: this.state.day,
        TimeSlot: this.state.timeslot,
      })
      .then((res) => {
        this.setState({ ...this.state, client: res.data });
        alert("Schedule updated successfully.\n");
        this.props.history.push("/registrar/schedule/viewall");
      })
      .catch((error) => {
        alert(error);
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
            <h4>Edit Schedule Information</h4>
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
                        <Label htmlFor="day" md={4}>
                          Day
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
                            type="select"
                            id="class"
                            name="class"
                            placeholder="Day"
                            onChange={(e) => {
                              var options = e.target.options;
                              for (var i = 0, l = options.length; i < l; i++) {
                                if (options[i].selected) {
                                  console.log(options[i].value);
                                  this.setState({
                                    ...this.state,
                                    day: options[i].value,
                                  });
                                }
                              }
                            }}
                          >
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="timeslot" md={4}>
                          TimeSlot
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#ead4c9",
                              color: "black",
                            }}
                            type="select"
                            id="class"
                            name="class"
                            placeholder="Time Slot"
                            onChange={(e) => {
                              var options = e.target.options;
                              for (var i = 0, l = options.length; i < l; i++) {
                                if (options[i].selected) {
                                  this.setState({
                                    ...this.state,
                                    timeslot: options[i].value,
                                  });
                                }
                              }
                            }}
                          >
                            <option value="08:00">08:00</option>
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="01:00">01:00</option>
                            <option value="02:00">02:00</option>
                            <option value="02:00">03:00</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="Faculty" md={4}>
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
                            placeholder="Selct Faculty"
                            onChange={(e) => {
                              var options = e.target.options;
                              var value = "";
                              for (var i = 0, l = options.length; i < l; i++) {
                                if (options[i].selected) {
                                  value = options[i].value;
                                }
                              }
                              this.setState({
                                ...this.state,
                                selectedFaculty: value,
                              });
                            }}
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

export default EditSchedule;
