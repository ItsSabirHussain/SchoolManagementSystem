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
  FormFeedback,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import axios from "axios";

class SendReminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var faculty = this.state.selectedFaculty;
    axios
      .post("http://localhost:4000/financemanager/feereminder", {
        Message: this.state.customMessage,
      })
      .then((res) => {
        this.setState({ ...this.state, client: res.data });
        alert("Reminder has been sent successfully.\n");
        this.props.history.push("/financemanager/sendfeereminder");
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
                        Custrom Message
                      </Label>

                      <Col lg={10}>
                        <Input
                          type="text"
                          id="custromMessage"
                          name="custromMessage"
                          placeholder="Custom Message"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              customMessage: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md={{ size: 10, offset: 2 }}>
                        <Button type="submit" color="primary">
                          Send Reminder
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

export default SendReminder;
