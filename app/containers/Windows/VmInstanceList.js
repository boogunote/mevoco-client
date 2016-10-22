import { FormattedMessage } from 'react-intl';
import { apiCall } from 'utils/remoteCall';
import { firstItem } from 'utils/helpers';

let VmInstanceList = {
  componentWillMount: function() {
    this.pageSizeList = [5, 10, 20, 50];
  },
  componentDidMount: function() {
    this.queryList();    
  },
  componentWillUnmount: function() {
  },
  queryList: function() {
    let self = this;
    apiCall({
      'org.zstack.header.vm.APIQueryVmInstanceMsg': {
        replyWithCount: true,
        conditions: []
      }
    }).then(function(result) {
      var ret = firstItem(result);
      if (ret.success) {
        if (!! ret.inventories && ret.inventories.length > 0) {
          self.props.updateDbVmList(ret.inventories);
          let itemList = [];
          ret.inventories.forEach(function(item) {
            itemList.push({
              'uuid': item.uuid,
              'highlight': false
            });
          })

          self.props.updateWindow(self.props.uuid, {
            list: itemList,
            count: ret.total
          });
        }
      } else {
      }
    })
  }
};

export default VmInstanceList;