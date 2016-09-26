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
import { genUniqueId } from 'utils/helpers'

import Button from 'components/Button';
import H1 from 'components/H1';

import styles from './styles.css';

import { queryListStart } from './actions';

import { selectWindows, selectVmList } from '../App/selectors';

export class VmListPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      uuid: genUniqueId('window'),
      list: [{
        key: 'test1',
        name: 'test1'
      }, {
        key: 'test2',
        name: 'test2'
      }]
    }
  };

  componentDidMount() {

  }


  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  queryList = () => {
    this.props.queryList({
      'org.zstack.header.vm.APIQueryVmInstanceMsg': {
        count: false,
        start: 0,
        replyWithCount: true,
        conditions: []
      }
    },
    this.state.uuid);
  }

  render() {
    var list = [];
    if (!!this.props.windows && !!this.props.list) {
      let vmList = this.props.list;
      this.props.windows[this.state.uuid].forEach(function(item) {
        list.push(vmList[item]);
      })
    }
    return (
      <div>
        <Helmet
          title="VM Instance"
          meta={[
            { name: 'description', content: 'VM Instance page of ZStack' },
          ]}
        />
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <table>
          <tbody>
            {list.map(function(item){
              return <tr key={item.uuid}><td>{item.name}</td></tr>
            })}
          </tbody>
        </table>
        <Button onClick={this.queryList}>
          Query
        </Button>
      </div>
    );
  }
}

// if (!!this.props.windows && !!this.props.windows[this.state.uuid]) {
//                 this.props.windows[this.state.uuid].map(function(item) {
//                   return item
//                 })
//               }
             



VmListPage.propTypes = {
  query: React.PropTypes.func,
  setWsConn: React.PropTypes.func,
};

// redux has to pass all functions through prop.
function mapDispatchToProps(dispatch) {
  return {
    queryList: (msg, windowUuid) => dispatch(queryListStart(msg, windowUuid)),
    changeRoute: (url) => dispatch(push(url)),
  };
}

// get state
const mapStateToProps = createStructuredSelector({
  windows: selectWindows(),
  list: selectVmList(),
});

export default connect(mapStateToProps, mapDispatchToProps)(VmListPage);
