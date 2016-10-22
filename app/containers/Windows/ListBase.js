import { genUniqueId } from 'utils/helpers';

let ListBase = {
  onClickRow: function(item) {
    let newList = Object.assign([], this.getWindowData().list);

    newList.forEach(function(_item) {
      if (_item.highlight) {
        _item.highlight = false;
      }
      if (_item.uuid == item.uuid) {
        _item.highlight = true;
      }
    })

    let newWindowUuid = genUniqueId('window-VmInstanceDetailSidePage-');

    this.props.createWindow(
      this.props.uuid,
      {
        detailSidePageItemUuid: item.uuid,
        detailSidePageWindowUuid: newWindowUuid
      },
      newWindowUuid,
      {
        uuid: item.uuid
      })
      
  },
  closeDetailSidePage: function() {
    this.props.updateWindow(this.props.uuid, {
      detailSidePageWindowUuid: null
    });
  },
  onPageSizeChange: function(event) {
    this.props.updateWindow(this.props.uuid, {
      pageSize: parseInt(event.target.value),
      pageNumber: 1
    });
    let self = this;
    setTimeout(function() {self.queryList()}, 0);
  },
  onPageUp: function() {
    let windowData = this.getWindowData();
    if ((windowData.pageNumber - 1) >= 1) {
      this.props.updateWindow(this.props.uuid, {
        pageNumber: windowData.pageNumber - 1
      });
      let self = this;
      setTimeout(function() {self.queryList()}, 0);
    }
  },
  onPageDown: function() {
    let windowData = this.getWindowData();
    let pageCount = 0;
    if (windowData.pageSize != 0)
      pageCount = Math.ceil(windowData.count / windowData.pageSize);
    if ((windowData.pageNumber + 1) >= 1) {
      this.props.updateWindow(this.props.uuid, {
        pageNumber: windowData.pageNumber + 1
      });
      let self = this;
      setTimeout(function() {self.queryList()}, 0);
    }
  },
  mergeWindowListAndDbList: function(windowList, dbList) {
    var list = [];
    windowList.forEach(function(item) {
      if (!!dbList[item.uuid]) {
        list.push(Object.assign({}, dbList[item.uuid], {'highlight': item.highlight}));
      }
    })
    return list;
  },
};

export default ListBase;