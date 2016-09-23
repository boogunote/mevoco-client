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
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import Button from 'components/Button';
import H1 from 'components/H1';

import styles from './styles.css';

import io from 'socket.io-client/dist/socket.io';
import sha512 from 'crypto-js/sha512';
import { firstItem } from 'utils/helpers'

import { loginStart } from './actions';
import { selectWsConn, selectApiCalls, selectSession } from '../App/selectors';


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

  queryList = () => {
    const result = remoteCall(
      this.props.wsconn, 
      this.props.session,
      this.props.remoteApiCallStart,
      'org.zstack.header.vm.APIQueryVmInstanceMsg',
      {
        count: false,
        start: 0,
        replyWithCount: true,
        conditions: []
      }
    );

    console.log(result)
  };

  login = () => {
    this.props.login({
      accountName: this.state.username,
      password: this.state.password
    })
  }

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
          <li>{!!this.props.wsconn ? this.props.wsconn.socket.sessionid : ''}</li>
        </ul>
        <Button onClick={this.login}>
          <FormattedMessage {...messages.loginButton} />
        </Button>
        <Button onClick={this.queryList}>
          Query
        </Button>
      </div>
    );
  }
}

LoginPage.propTypes = {
  changeRoute: React.PropTypes.func,
  login: React.PropTypes.func,
  setWsConn: React.PropTypes.func,
  remoteApiCallStart: React.PropTypes.func
};

// redux has to pass all functions through prop.
function mapDispatchToProps(dispatch) {
  return {
    login: (param) => dispatch(loginStart(param)),
    setWsConn: (wsconn) => dispatch(setWsConn(wsconn)),
    apiCallStart: (result) => dispatch(apiCallStart(result)),
    changeRoute: (url) => dispatch(push(url)),
  };
}

// get state
const mapStateToProps = createStructuredSelector({
  wsconn: selectWsConn(),
  apiCalls: selectApiCalls(),
  session: selectSession(),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
