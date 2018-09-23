import React, { Component } from 'react';
import { Menu, Container, Image, Dropdown } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import logo from './logo.png';
import './App.css';
import Form from './components/FormContainer';
import Dashboard from './components/Dashboard';
import OtherHospital from './components/OtherHospital';
import List from './components/List';
import Home from './components/Home';
import ScrollToTop from './ScrollToTop';

export const fakeKeys = [
  {
    pk: '5J6x2qJ8PV8FJUMSXAhdb6dREmeu54AZmwWUEtMwYva3FgfTCuZ',
    ok: 'hospital1son',
  },
  {
    pk: '5K7HHhGDtazXAuPjyfUR2T28PwqjisDWcbpBPTnYfi2P8epz23H',
    ok: 'hospital2art',
  }
]


class App extends Component {

  state = {
    pk: fakeKeys[0].pk,
  }

  handlePrivateKeyChange = (e, data) => {
    this.setState({ pk: data.value })
  }

  render() {
    const { pk } = this.state;
  
    return (
      <Router>
      <ScrollToTop>
        <Menu
        style={{
        }}
        fixed='top'
        size='large'>
        <Container>
        <Link
              style={{
              margin: 'auto 0',
              textDecoration: 'none',
            }}
              to="/">
              <Menu.Item header>
            <Image size='tiny' src={logo} />
            Transfer Life
          </Menu.Item>
              </Link>
            <Link
              style={{
              margin: 'auto 0',
              textDecoration: 'none',
            }}
              to="/form">
            <Menu.Item>Form (Doctors)</Menu.Item>
          </Link>
            <Link
              style={{
              margin: 'auto 0',
              textDecoration: 'none',
            }}
              to="/dashboard">
              <Menu.Item>Dashboard (Management)</Menu.Item>
            </Link>
            {/* <Link
              style={{
              margin: 'auto 0',
              textDecoration: 'none',
            }}
              to="/list">
              <Menu.Item>List (Management)</Menu.Item>
          </Link> */}
        </Container>
        <Menu.Menu position='right'>
          <Menu.Item style={{ margin: '0 20px' }}header>
            <Dropdown
              options={fakeKeys.map(key => ({ value: key.pk, text: key.ok }))}
              pointing
              onChange={this.handlePrivateKeyChange}
              value={pk}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <ToastContainer />
      <Route exact path="/" component={Home}/>
      <Route path="/form" component={Form}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/otherhospital" component={OtherHospital} />
      <Route path="/list" component={List} />
      </ScrollToTop>
    </Router>
    );
  }
}

export default App;
