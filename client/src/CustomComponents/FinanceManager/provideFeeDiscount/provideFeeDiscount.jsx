import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import axios from "axios";

class ProvideFeeDiscount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: "",
      discount: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var faculty = this.state.selectedFaculty;
    axios
      .post("http://localhost:4000/financemanager/providefeediscount", {
        StudentID: this.state.studentID,
        Discount: this.state.discount,
      })
      .then((res) => {
        this.setState({ ...this.state, client: res.data });
        alert("Fee discount has been provided successfully.\n");
        this.props.history.push("/financemanager/providefeediscount");
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <div>
        <Row>
          <Col lg={10}>
            <Widget title={<h4> Send Fee Reminder </h4>} close settings>
              <Row>
                <Col>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                      <Label htmlFor="customMessage" md={2}>
                        Student ID
                      </Label>

                      <Col lg={10}>
                        <Input
                          type="text"
                          id="custromMessage"
                          name="custromMessage"
                          placeholder="StudentID"
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
                      <Label htmlFor="discountPercentage" md={2}>
                        Discount Percentage
                      </Label>

                      <Col lg={10}>
                        <Input
                          type="text"
                          id="discountPercentage"
                          name="discountPercentage"
                          placeholder="Discount Percentage"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              discount: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md={{ size: 10, offset: 2 }}>
                        <Button type="submit" color="primary">
                          Grant
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

export default ProvideFeeDiscount;
