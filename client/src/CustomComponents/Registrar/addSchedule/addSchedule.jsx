import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  FormFeedback,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "../dashboard/Dashboard.module.scss";
import axios from "axios";

class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      class: "",
      faculty: [],
      department: "",
      day: " ",
      timeslot: "",
      selectedFaculty: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleSubmit(e) {
    var faculty = this.state.selectedFaculty;

    e.preventDefault();
    axios
      .post("http://localhost:4000/registrar/addschedule", {
        Name: this.state.name,
        Code: this.state.code,
        Class: this.state.class,
        Faculty: faculty,
        Department: this.state.department,
        Day: this.state.day,
        TimeSlot: this.state.timeslot,
      })
      .then((res) => {
        alert("Schedule added successfully.\n");
        this.props.history.push("/registrar/schedule/addnew");
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col lg={{ size: 8, offset: 1 }}>
            <Widget title={<h4> Enter detail of schedule</h4>} close settings>
              <Row>
                <Col>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                      <Label htmlFor="name" md={2}>
                        Subject
                      </Label>

                      <Col lg={10}>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Name"
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
                      <Label htmlFor="code" md={2}>
                        Code
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="code"
                          name="code"
                          placeholder="Subjeect Code"
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
                      <Label htmlFor="department" md={2}>
                        Department
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="department"
                          name="department"
                          placeholder="Department"
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
                      <Label htmlFor="class" md={2}>
                        Class
                      </Label>
                      <Col md={10}>
                        <Input
                          type="tel"
                          id="class"
                          name="class"
                          placeholder="Class"
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
                      <Label htmlFor="day" md={2}>
                        Day
                      </Label>
                      <Col md={10}>
                        <Input
                          type="select"
                          id="class"
                          name="class"
                          placeholder="Day"
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
                              day: value,
                            });
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
                      <Label htmlFor="timeslot" md={2}>
                        TimeSlot
                      </Label>
                      <Col md={10}>
                        <Input
                          type="select"
                          id="class"
                          name="class"
                          placeholder="Time Slot"
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
                              timeslot: value,
                            });
                          }}
                        >
                          <option value="08:00">08:00</option>
                          <option value="08:00">09:00</option>
                          <option value="08:00">10:00</option>
                          <option value="08:00">11:00</option>
                          <option value="08:00">12:00</option>
                          <option value="08:00">01:00</option>
                          <option value="08:00">02:00</option>
                          <option value="08:00">03:00</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="Faculty" md={2}>
                        Faculty
                      </Label>
                      <Col md={10}>
                        <Input
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
                      <Col md={{ size: 10, offset: 2 }}>
                        <Button type="submit" color="primary">
                          Add Schedule
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddSchedule;
