import { FormattedMessage } from 'react-intl';
import { apiCall } from 'utils/remoteCall';
import { firstItem } from 'utils/helpers';
import { genUniqueId } from 'utils/helpers';

let VmInstanceList = {
  componentWillMount: function() {
  },
  componentDidMount: function() {
    let self = this;
    setTimeout(function() {self.queryList()}, 0);
  },
  componentWillUnmount: function() {
  },
  shouldComponentUpdate(nextProps, nextState) {
    let windowData = this.getWindowData();
    if (!windowData || !this.props.dbVm) {
      return false;
    } else {
      return true;
    }
  },
  queryList: function() {
    let windowData = this.getWindowData();
    if (!windowData) return;
    let self = this;
    apiCall({
      'org.zstack.header.vm.APIQueryVmInstanceMsg': {
        count: false,
        start: windowData.pageSize*(windowData.pageNumber - 1),
        limit: windowData.pageSize,
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
              uuid: item.uuid,
              selected: false
            });
          })

          self.props.updateWindow(self.props.windowUuid, {
            list: itemList,
            count: ret.total
          });
        }
      } else {
      }
    })
  },
  openCreateVmDialog: function() {
    let newWindowUuid = genUniqueId('window-createVmDialog-');

    // NOTICE: To avoid uncontrolled component warning in React,
    // default value should be provided.
    // https://github.com/twisty/formsy-react-components/issues/66
    this.props.createWindow(
      this.props.windowUuid,
      {
        createVmDialogWindowUuid: newWindowUuid
      },
      newWindowUuid,
      {
        name: ''
      }
    );
  },
  closeCreateVmDialog: function() {
    this.props.updateWindow(this.props.windowUuid, {
      createVmDialogWindowUuid: null
    })
  },
  createVm: function(data) {
    let self = this;
    apiCall({
      'org.zstack.header.vm.APICreateVmInstanceMsg': {
        name: data.name,
        instanceOfferingUuid: data.instanceOfferingUuid,
        imageUuid: data.imageUuid,
        l3NetworkUuids: data.l3NetworkUuids,
        defaultL3NetworkUuid: data.l3NetworkUuids[0]
      }
    }).then(function(result) {
      var ret = firstItem(result);
      if (ret.success) {
        self.queryList()
      } else {
        console.log(JSON.stringify(result))
        // self.props.queryListFailed(ret);
      }
    })
  },
};

export default VmInstanceList;