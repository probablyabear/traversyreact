import React, { Component } from 'react';
import Contact from '../contact/contact';
import { Consumer } from '../../context';

class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">Contact List</h1>
              {contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );

    // const { contacts } = this.state;

    // return (
    //   <div>
    //     {contacts.map(contact => (
    //       <Contact
    //         key={contact.id}
    //         name={contact.name}
    //         email={contact.email}
    //         phone={contact.phone}
    //       />
    //     ))}
    //   </div>
    // );
    // --------- Simple return method
    // Instead of passing along each value separately, consider passing in the entire contact object that comes from the map method
    // return (
    //   Replace the usual <div> with a react fragment
    //   <React.Fragment>
    //     {contacts.map(contact => (
    //       <Contact
    //         key={contact.id}
    //         contact={contact}
    //         deleteClickHandler={event => this.deleteContact(contact.id)}
    //       />
    //     ))}
    //   </React.Fragment>
    // );
    // ----------
    // Render helper method
    // const contactList = contacts.map(contact => {
    //   return <Contact key={contact.id} contact={contact} />;
    // });
    // return <div>{contactList}</div>;
  }
}

export default Contacts;
