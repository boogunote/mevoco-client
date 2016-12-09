/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

// import Img from 'components/Img';
// import Footer from 'components/Footer';
// import Logo from './logo-big.png';
// import A from 'components/A';

// import { EventEmitter } from 'fbemitter';

import styles from './styles.css';

function App(props) {
  // let emitter = new EventEmitter();
  return (
    <div className={styles.container}>
      <Helmet
        titleTemplate="Mevoco"
        defaultTitle="Mevoco"
        meta={[
          { name: 'description', content: 'Powered by ZStack' },
        ]}
      />
      {React.Children.toArray(props.children)}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
