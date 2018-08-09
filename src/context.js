import React, { Component } from 'react';
import axios from 'axios';
const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };

    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };

    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(
          contact =>
            contact.id === action.payload.id
              ? (contact = action.payload)
              : contact
        )
      };

    // case 'UPDATE_CONTACT':
    //   console.log(action.payload);
    //   return {
    //     ...state,
    //     conatcts: state.contacts.map(contact => {
    //       if (contact.id === action.payload.id) {
    //         console.log('ID matches:', contact.id);
    //         return (contact = action.payload);
    //       } else {
    //         return contact;
    //       }
    //     })
    //   };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  componentDidMount() {
    console.log('mounted!');
    axios.get('https://jsonplaceholder.typicode.com/users').then(response =>
      this.setState({
        contacts: response.data
      })
    );
  }

  // Get contacts using async/await
  // async componentDidMount() {
  //   const response = await axios.get(
  //     'https://jsonplaceholder.typicode.com/users'
  //   );

  //   this.setState({ contacts: response.data });
  // }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
