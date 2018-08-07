import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  // Used curried function to pass in additional parameters from component to the onShowClick method (https://medium.freecodecamp.org/reactjs-pass-parameters-to-event-handlers-ca1f5c422b9)
  onShowClick = (name, id) => event => {
    this.setState({
      showContactInfo: !this.state.showContactInfo
    });
  };

  // onDeleteClick = (id, dispatch) => {
  //   axios
  //     .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
  //     .then(response =>
  //       dispatch({
  //         type: 'DELETE_CONTACT',
  //         payload: id
  //       })
  //     );
  // };

  // Using async/await to delete contact
  onDeleteClick = async (id, dispatch) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    dispatch({
      type: 'DELETE_CONTACT',
      payload: id
    });
  };

  render() {
    // Destructure our needed properties from the props
    // const { name, email, phone } = this.props;

    // Since contacts is passing a whole contact object, we can accept that here
    const { contact } = this.props;

    // Destructure onShowClick value from state
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {contact.name + ' '}
                <i
                  onClick={this.onShowClick(contact.name, contact.id)}
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={this.onDeleteClick.bind(this, contact.id, dispatch)}
                />
                <Link to={`contact/edit/${contact.id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {contact.email}</li>
                  <li className="list-group-item">Phone: {contact.phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
