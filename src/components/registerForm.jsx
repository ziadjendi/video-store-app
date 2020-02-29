import React from "react";
import { Container, withStyles, Typography } from "@material-ui/core";

import Joi from "@hapi/joi";
import Form from "./common/form";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },

  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .trim()
      .email({ minDomainSegments: 2, tlds: ["com", "net", "org", "ae"] })
      .required()
      .label("Email"),
    password: Joi.string()
      .min(6)
      .max(20)
      .required()
      .label("Password"),
    name: Joi.string()
      .min(2)
      .max(20)
      .required()
      .label("Name")
  };

  doSubmit = () => {
    console.log("Registered");
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form
            onSubmit={this.handleSubmit}
            className={classes.form}
            noValidate
          >
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}
            {this.renderSubmitButton("Register")}
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(RegisterForm);
