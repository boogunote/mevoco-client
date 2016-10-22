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
    this.props.setPageSize(event.target.value);
    this.props.pageVmSetPageNumber(1);
    let self = this;
    setTimeout(function() {self.queryList()}, 0);
  },
  onPageUp: function() {
    if ((this.props.pageNumber - 1) >= 1) {
      this.props.pageVmSetPageNumber(this.props.pageNumber - 1);
      let self = this;
      setTimeout(function() {self.queryList()}, 0);
    }
  },
  onPageDown: function() {
    let pageCount = 0;
    if (this.props.pageSize != 0)
      pageCount = Math.ceil(this.props.itemCount / this.props.pageSize);
    if ((this.props.pageNumber + 1) <= pageCount) {
      this.props.pageVmSetPageNumber(this.props.pageNumber + 1);
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