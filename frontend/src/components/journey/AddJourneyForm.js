import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { RouteEnum } from "./helpers/routes.js";

export default class AddJourneyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journeyToAdd: this.props.journeyToAdd,
      localError: "",
      showSuccess: false,
      editSuccess: false
    };
  }

  componentDidUpdate(prevProps) {
    // If journeyToAdd prop changes, update state
    if (prevProps.journeyToAdd !== this.props.journeyToAdd) {
      this.setState({ journeyToAdd: this.props.journeyToAdd });
    }
  }

  // Convert ISO timestamp (or other parsable date) to datetime-local input value
  formatForInput = (ts) => {
    if (!ts) return "";
    const d = new Date(ts);
    if (isNaN(d.getTime())) return "";
    
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  handleChange = (e) => {
    console.log("handleChange", e.target);
    const { name, value, type } = e.target;
    let parsedValue;
    if (name === "timestamp") {
      // datetime-local returns 'YYYY-MM-DDTHH:MM' — convert to ISO string for backend
      parsedValue = value ? new Date(value).toISOString() : "";
    } else {
      parsedValue = type === "number" ? Number(value) : value;
    }
    this.setState({
      journeyToAdd: {
        ...this.state.journeyToAdd,
        [name]: parsedValue,
      },
    });
  };

  handleSave = () => {
    const { onSave, username } = this.props;
    const { journeyToAdd } = this.state;
    // If timestamp is blank, allow (backend will use now)
    if (journeyToAdd.timestamp) {
      const journeyDate = new Date(journeyToAdd.timestamp);
      const now = new Date();
      if (journeyDate > now) {
        this.setState({ localError: "Forbidden: Cannot Create a Future Journey", showSuccess: false, editSuccess: false });
        return;
      }
    }
    this.setState({ localError: "" });
    onSave(journeyToAdd);
    // Show success banner for add or edit
    if (!journeyToAdd.id) {
      this.setState({
        journeyToAdd: {
          userId: journeyToAdd.userId,
          route: "",
          username: username || journeyToAdd.username || "",
        },
        localError: "",
        showSuccess: true,
        editSuccess: false
      });
    } else {
      this.setState({
        editSuccess: true,
        showSuccess: false
      });
    }
  };

  render() {
    const { toggle } = this.props;
    const { userId, route } = this.state.journeyToAdd;
    const { errorMessage } = this.props;
    const displayUsername = this.props.username || this.state.journeyToAdd.username || "";
    const { localError, showSuccess, editSuccess } = this.state;

    const isEdit = !!this.state.journeyToAdd.id;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {isEdit ? `Edit Journey ${this.state.journeyToAdd.id}` : 'Add Journey'}
        </ModalHeader>

        <ModalBody>
          {showSuccess && (
            <div className="alert alert-success" role="alert">
              Successfully added a new journey
            </div>
          )}
          {editSuccess && (
            <div className="alert alert-success" role="alert">
              Journey edited successfully
            </div>
          )}
          {(errorMessage || localError) && (
            <div className="alert alert-danger" role="alert">
              {localError || errorMessage}
            </div>
          )}
          <Form>
            {/* Username (read-only) */}
            <FormGroup>
              <Label for="journey-username">Username</Label>
              <Input
                type="text"
                id="journey-username"
                value={displayUsername}
                disabled
              />
            </FormGroup>

            {/* Route ID */}
            <FormGroup>
            <Label for="journey-route">Route</Label>
            <Input
              type="select"
              id="journey-route"
              name="route"
              value={route}
              onChange={this.handleChange}
            >
                <option value="">Select a route</option>

                {Object.values(RouteEnum).map(route => (
                <option key={route} value={route}>
                    {route}
                </option>
                ))}
            </Input>
            </FormGroup>

            {/* Optional timestamp */}
            <FormGroup>
              <Label for="journey-timestamp">Date (optional)</Label>
              <Input
                type="datetime-local"
                id="journey-timestamp"
                name="timestamp"
                value={this.formatForInput(this.state.journeyToAdd.timestamp)}
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">
                Optional — if left blank the current date/time will be used.
              </small>
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button
            color="success"
            onClick={this.handleSave}
          >
            Save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
