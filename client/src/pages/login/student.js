import React from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import {
  Container,
  Alert,
  Button,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
} from "reactstrap";
import Widget from "../../components/Widget/Widget";
import axios from "axios";

class Student extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.doLogin = this.doLogin.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  doLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/student/login", {
        Email: this.state.email,
        Password: this.state.password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("studentID", res.data.ID);
        this.props.history.push("/student");
      })
      .catch((error) => {
        alert(error);
      });
  }

  signUp() {
    this.props.history.push("/");
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/student" },
    }; // eslint-disable-line

    // cant access login page while logged in
    if (localStorage.getItem("studentID")) {
      return <Redirect to={from} />;
    }

    return (
      <div className="auth-page">
        <Container>
          <Widget
            className="widget-auth mx-auto"
            title={<h3 className="mt-0">Student Login</h3>}
          >
            <p className="widget-auth-info">Use your credentials to login</p>
            <form onSubmit={this.doLogin}>
              {this.props.errorMessage && (
                <Alert
                  className="alert-sm widget-middle-overflow rounded-0"
                  color="danger"
                >
                  {this.props.errorMessage}
                </Alert>
              )}
              <FormGroup className="mt">
                <Label for="id">ID</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-user text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="id"
                    className="input-transparent pl-3"
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        email: e.target.value,
                      });
                    }}
                    type="id"
                    required
                    name="id"
                    placeholder="id"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-lock text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="password"
                    className="input-transparent pl-3"
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        password: e.target.value,
                      });
                    }}
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="bg-widget auth-widget-footer">
                <Button
                  type="submit"
                  color="primary"
                  className="auth-btn"
                  size="sm"
                  style={{ color: "#fff" }}
                >
                  <span className="auth-btn-circle" style={{ marginRight: 8 }}>
                    <i className="la la-caret-right" />
                  </span>
                  {this.props.isFetching ? "Loading..." : "Login"}
                </Button>
                <p className="widget-auth-info mt-4" style={{ color: "white" }}>
                  For registrar login click below!
                </p>
                <Link className="d-block text-center mb-4" to="registrarlogin">
                  Click Here
                </Link>
                <p className="widget-auth-info mt-4" style={{ color: "white" }}>
                  For admission login click below!
                </p>
                <Link className="d-block text-center mb-4" to="admissionlogin">
                  Click Here
                </Link>
                <p className="widget-auth-info mt-4" style={{ color: "white" }}>
                  For facutly login click below!
                </p>
                <Link className="d-block text-center mb-4" to="facultylogin">
                  Click Here
                </Link>
                <p className="widget-auth-info mt-4" style={{ color: "white" }}>
                  For finance manager login click below!
                </p>
                <Link
                  className="d-block text-center mb-4"
                  to="financemanagerlogin"
                >
                  Click Here
                </Link>
              </div>
            </form>
          </Widget>
        </Container>
        <footer className="auth-footer">
          2020 &copy; School Management System.
        </footer>
      </div>
    );
  }
}

export default Student;
