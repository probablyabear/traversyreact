import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/layout/header';
import Contacts from './components/contacts/contacts';
import AddContact from './components/addcontact/addcontact';
import EditContact from './components/editcontact/editcontact';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import About from './components/Pages/about';
import NotFound from './components/Pages/notfound';

import { Provider } from './context';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
