import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "../dashboard/Dashboard.module.scss";
import axios from "axios";

class AddSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      class: "",
      faculty: [],
      department: "",
      selectedFaculty: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    var faculty = [];
    this.state.selectedFaculty.map((e, index) => {
      faculty.push({ ID: e });
    });
    console.log(faculty);
    e.preventDefault();
    axios
      .post("http://localhost:4000/registrar/addsubject", {
        Name: this.state.name,
        Code: this.state.code,
        Class: this.state.class,
        Faculty: faculty,
        Department: this.state.department,
      })
      .then((res) => {
        alert("Subject added successfully.\n");
        this.props.history.push("/registrar/subject/addnew");
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
      <div className={s.root}>
        <Row>
          <Col lg={{ size: 8, offset: 1 }}>
            <Widget title={<h4> Enter detail of subject</h4>} close settings>
              <Row>
                <Col>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                      <Label htmlFor="name" md={2}>
                        Name
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
                          placeholder="class"
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
                      <Col md={{ size: 10, offset: 2 }}>
                        <Button type="submit" color="primary">
                          Add Subject
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

export default AddSubject;
