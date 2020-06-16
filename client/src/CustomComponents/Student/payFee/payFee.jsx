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

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: "",
      cardnumber: "",
      nameoncard: "",
      expiredate: Date,
      cvv: "",
      ammount: "",
      totalFee: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/student/payfee", {
        StudentID: this.props.data._id,
        Name: this.props.data.Name,
        Department: this.props.data.Department,
        Class: this.props.data.Class,
        TotalFee: this.state.totalFee,
        Paid: this.state.ammount,
        Month: this.state.month,
      })
      .then((res) => {
        alert("Fee has beed paid successfully.");
        this.props.history.push("/student/payfee");
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col lg={10}>
            <Widget title={<h4> Pay to Staff</h4>} close settings>
              <Row>
                <Col>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                      <Label htmlFor="month" md={2}>
                        Month
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="month"
                          name="month"
                          placeholder="Month"
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
                      <Label htmlFor="month" md={2}>
                        Total Fee
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="month"
                          name="month"
                          placeholder="Total Fee"
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
                      <Label htmlFor="cardnumber" md={2}>
                        Card Number
                      </Label>
                      <Col md={3}>
                        <Input
                          type="text"
                          id="cardnumber"
                          name="cardnumber"
                          placeholder="Card Number"
                        />
                      </Col>
                      <Label htmlFor="nameoncard" md={{ size: 2, offset: 1 }}>
                        Card Holder's Name
                      </Label>
                      <Col md={3}>
                        <Input
                          type="text"
                          id="nameoncard"
                          name="nameoncard"
                          placeholder="Name on Card"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="cvv" md={2}>
                        CVV
                      </Label>
                      <Col md={3}>
                        <Input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="CVV"
                        />
                      </Col>
                      <Label htmlFor="amount" md={{ size: 2, offset: 1 }}>
                        Ammount
                      </Label>
                      <Col md={3}>
                        <Input
                          type="text"
                          id="amount"
                          name="amount"
                          placeholder="Amount"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              ammount: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md={{ size: 10, offset: 2 }}>
                        <Button type="submit" color="primary">
                          Send Payment
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

export default Payment;
