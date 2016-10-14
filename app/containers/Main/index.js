/**
 *
 * Main.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import Img from 'components/Img';
import Footer from 'components/Footer';
import Logo from 'containers/App/logo-big.png';
import A from 'components/A';

import mainStyles from 'containers/App/styles.css';

export class Main extends React.Component {
  render() {
    return (
      <div>
        <A className={mainStyles.logoWrapper} href="https://twitter.com/mxstbr">
          <Img className={mainStyles.logo} src={Logo} alt="react-boilerplate - Logo" />
        </A>
        {/* 渲染这个 child 路由组件 */}
        {this.props.children || "Welcome to your Inbox"}
        <Footer />
      </div>
    );
  }
}

Main.propTypes = {
  children: React.PropTypes.node,
};

export default Main;
