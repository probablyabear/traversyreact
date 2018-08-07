import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/textinputgroup';
import axios from 'axios';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    // Add errors object to hold possible errors discovered during form submission
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const contact = response.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onInputChange = event => {
    this.setState({
      // Bracketing event.target.name allows us to set that property name without explicity defining it beforehand. In this case, we're passing it from the onInputChange property (https://stackoverflow.com/questions/49437859/adding-brackets-to-the-attribute-in-setstate)
      [event.target.name]: event.target.value
    });
  };

  onFormSubmit = async (dispatch, event) => {
    event.preventDefault();
    // Get values from the form's state (this component using destructuring)
    const { name, email, phone } = this.state;

    // Check for errors on form
    if (name === '') {
      this.setState({
        errors: {
          name: 'Name is required'
        }
      });
      return;
    }

    if (email === '') {
      this.setState({
        errors: {
          email: 'Email is required'
        }
      });
      return;
    }

    if (phone === '') {
      this.setState({
        errors: {
          phone: 'Phone is required'
        }
      });
      return;
    }

    // Update contact on server and send dispatch to context to update our app state

    // Get current contact ID from URL params
    const { id } = this.props.match.params;

    // Get updated contact info from form. Available because we destructured the values off the state object on line 40
    const updatedContact = {
      name: name,
      email: email,
      phone: phone
    };

    // Make put request to server using ID from our URL params
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updatedContact
    );

    dispatch({
      type: 'UPDATE_CONTACT',
      payload: res.data
    });

    // Clear form fields (this component's state) after submission
    this.setState({
      name: '',
      phone: '',
      email: '',
      errors: {}
    });

    // Redirect to homepage
    this.props.history.push('/');
  };

  render() {
    // Destructure state to get access to properties
    const { name, email, phone, errors } = this.state;

    // Implement consumer to access state in context.js
    return (
      <Consumer>
        {value => {
          // Destructure value to get the dispatch function off the state
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onFormSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    name="name"
                    label="Name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onInputChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    name="email"
                    label="Email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onInputChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    name="phone"
                    label="Phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onInputChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-success btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
