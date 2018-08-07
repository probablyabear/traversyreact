import React, { Component } from 'react';

class AddContactUncontrolled extends Component {
  onFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  static defaultProps = {
    name: 'Fred Smith',
    email: 'fsmith@aol.com',
    phone: '555-555-5555'
  };

  render() {
    // Destructure state to get access to properties
    const { name, email, phone } = this.props;
    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form onSubmit={this.onFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter Name"
                className="form-control form-control-lg"
                defaultValue={name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter Email"
                className="form-control form-control-lg"
                defaultValue={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Phone</label>
              <input
                name="phone"
                type="text"
                placeholder="Enter Phone"
                className="form-control form-control-lg"
                defaultValue={phone}
              />
            </div>
            <input
              type="submit"
              value="Add Contact"
              className="btn btn-success btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default AddContactUncontrolled;
