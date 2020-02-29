import React, { Component } from "react";
import Joi from "@hapi/joi";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@material-ui/core";
import { PropTypes } from "prop-types";

class Form extends Component {
  state = { data: {}, errors: {} };

  selectLabel = React.createRef();

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.object(this.schema).validate(
      this.state.data,
      options
    );
    if (!error) return {};
    let errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = {
      [name]: this.schema[name]
    };
    const { error } = Joi.object(schema).validate(obj);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMesssage = this.validateProperty(input);
    if (errorMesssage) errors[input.name] = errorMesssage;
    else delete errors[input.name];
    this.setState({ errors });

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSelectChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSubmit = event => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (Object.keys(errors).length > 0) return;

    this.doSubmit();
  };

  renderSubmitButton(label) {
    return (
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={this.props.classes.submit}
        disabled={Object.keys(this.validate()).length > 0}
      >
        {label}
      </Button>
    );
  }

  renderInput(name, label, type = "text", ...options) {
    const { data, errors } = this.state;
    return (
      <TextField
        id={name}
        label={label}
        name={name}
        type={type}
        autoComplete={name}
        value={data[name]}
        onChange={this.handleChange}
        helperText={errors[name]}
        error={errors[name] && true}
        required
        fullWidth
        variant="outlined"
        margin="normal"
        {...options}
      />
    );
  }

  renderHiddenInput(name) {
    const { data } = this.state;
    return <input type="hidden" name={name} id={name} value={data[name]} />;
  }

  renderSelect(name, lable, options) {
    const { data, errors, lableWidth } = this.state;
    return (
      <FormControl
        variant="outlined"
        className={this.props.classes.formControl}
        fullWidth
        required
      >
        <InputLabel ref={this.selectLabel} id={"lable" + name}>
          {lable}
        </InputLabel>
        <Select
          labelId={"lable" + name}
          id={name}
          value={data[name]}
          name={name}
          onChange={this.handleSelectChange}
          labelWidth={lableWidth}
        >
          {options.map(option => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors[name]}</FormHelperText>
      </FormControl>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Form;
