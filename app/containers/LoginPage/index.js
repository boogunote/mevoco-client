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
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import Button from 'components/Button';
import H1 from 'components/H1';

import styles from './styles.css';
import appStyles from '../App/styles.css';

import io from 'socket.io-client/dist/socket.io';
import sha512 from 'crypto-js/sha512';
import { firstItem } from 'utils/helpers'

import { loginSuccess } from './actions';
import { selectWsConn, selectApiCalls, selectSession } from '../App/selectors';

import { loginByAccount } from 'utils/remoteCall';

import Logo from './logo-big.png';
import A from 'components/A';
import Img from 'components/Img';


export class LoginPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      username: this.props.username ? this.props.username : '',
      password: ''
    };

    console.log(this.state)
  };

  componentWillMount() {
  }

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
    let self = this;
    loginByAccount({
      accountName: this.state.username,
      password: this.state.password
    }).then(function(msg) {
      if (msg.success) {
        localStorage.setItem('sessionUuid', msg.inventory.uuid)
        self.props.loginSuccess(msg.inventory);
        push('/main/vm')
      }
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <Helmet
          title="Login Page"
          meta={[
            { name: 'description', content: 'Login page of Mevoco' },
          ]}
        />
        <div className={styles.center}>
          <A className={styles.logoWrapper} href="http://www.mevoco.com">
            <Img className={styles.logo} src={Logo} alt="Mevoco - Logo" />
          </A>
          <input
            id="username"
            className={`${styles.inputCommon} ${styles.inputUsername} ${appStyles.normalFont}`}
            type="text"
            placeholder={this.props.intl.formatMessage(messages.username)}
            value={this.state.username}
            onChange={this.onChangeUsername}
          />
          <input
            id="password"
            className={`${styles.inputCommon} ${styles.inputPassword} ${appStyles.normalFont}`}
            type="password"
            placeholder={this.props.intl.formatMessage(messages.password)}
            value={this.state.password}
            onChange={this.onChangePassword}
          />
          <Button onClick={this.login}>
            <FormattedMessage {...messages.login} />
          </Button>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  intl: intlShape.isRequired,
  changeRoute: React.PropTypes.func,
  login: React.PropTypes.func,
  setWsConn: React.PropTypes.func,
  remoteApiCallStart: React.PropTypes.func
};

// redux has to pass all functions through prop.
function mapDispatchToProps(dispatch) {
  return {
    loginSuccess: (param) => dispatch(loginSuccess(param)),
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LoginPage));
