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
import Logo from './logo-small.png';
import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';

import styles from './styles.css';

export class Main extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.nav}>
          <A className={styles.logoWrapper} href="http://www.mevoco.com">
            <Img className={styles.logo} src={Logo} alt="Mevoco - Logo" />
          </A>
        </div>
        <div className={styles.article}>
          <div className={styles.header}>
            <div className={styles.headerRight}>
              <LocaleToggle />
            </div>
          </div>
          <div className={styles.section}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  children: React.PropTypes.node,
};

export default Main;
