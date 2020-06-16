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

class Faculty extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static isAuthenticated(token) {
    if (token) return true;
  }

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
      .post("http://localhost:4000/faculty/login", {
        Email: this.state.email,
        Password: this.state.password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("facultyID", res.data.ID);
        this.props.history.push("/faculty");
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
      from: { pathname: "/faculty" },
    }; // eslint-disable-line

    // cant access login page while logged in
    if (localStorage.getItem("facultyID")) {
      return <Redirect to={from} />;
    }

    return (
      <div className="auth-page">
        <Container>
          <Widget
            className="widget-auth mx-auto"
            title={<h3 className="mt-0">Faculty Login</h3>}
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
                    value={this.state.email}
                    onChange={this.changeEmail}
                    type="id"
                    required
                    name="id"
                    placeholder="id"
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        email: e.target.value,
                      });
                    }}
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
                    value={this.state.password}
                    onChange={this.changePassword}
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        password: e.target.value,
                      });
                    }}
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
                  For student login click below!
                </p>
                <Link className="d-block text-center mb-4" to="studentlogin">
                  Click Here
                </Link>
                <p className="widget-auth-info mt-4" style={{ color: "white" }}>
                  For admission login click below!
                </p>
                <Link className="d-block text-center mb-4" to="admissionlogin">
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

export default Faculty;
