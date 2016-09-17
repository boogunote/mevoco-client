/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import messages from './messages';
import { FormattedMessage } from 'react-intl';
import Button from 'components/Button';
import H1 from 'components/H1';

import styles from './styles.css';

import io from 'socket.io-client/dist/socket.io';

window.io = io;

import sha512 from 'crypto-js/sha512'

export class LoginPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      username: this.props.username ? this.props.username : '',
      password: ''
    };

    console.log(this.state)
  };

  onChangeUsername = (event) => {
    this.setState({username: event.target.value});
  };

  onChangePassword = (event) => {
    this.setState({password: event.target.value});
  };

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  /**
   * Changed route to '/'
   */
  openHomePage = () => {
    this.openRoute('/');
  };

  login = () => {
    console.log('login ' + this.state.username + ' ' + this.state.password );
    var socket = io.connect('http://172.20.14.207:5000');
    var msg = {
      'org.zstack.header.identity.APILogInByAccountMsg': {
        accountName: this.state.username,
        password: sha512(this.state.password).toString()
      }
    };

    var data = {'msg' : JSON.stringify(msg)};
    // console.log(JSON.stringify(data, null, 2));
    // $cookies.remove('sessionId');
    socket.emit('login', data);

    var self = this;
    socket.on('login_ret', function(ret) {        
      console.log(JSON.stringify(ret))
      self.openHomePage();
    });
  };

  render() {
    return (
      <div>
        <Helmet
          title="Login Page"
          meta={[
            { name: 'description', content: 'Login page of Mevoco' },
          ]}
        />
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <input
              id="username"
              className={styles.input}
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </li>

          <li className={styles.listItem}>
            <input
              id="password"
              className={styles.input}
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </li>
        </ul>
        <Button onClick={this.login}>
          <FormattedMessage {...messages.loginButton} />
        </Button>
      </div>
    );
  }
}
LoginPage.propTypes = {
  changeRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(LoginPage);
