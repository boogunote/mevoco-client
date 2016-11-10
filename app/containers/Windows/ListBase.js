import { genUniqueId } from 'utils/helpers';

let ListBase = {
  onClickRow: function(event, item) {
    if ('INPUT' == event.target.tagName) return;
    let newList = Object.assign([], this.getWindowData().list);

    newList.forEach(function(_item) {
      if (_item.selected) {
        _item.selected = false;
      }
      if (_item.uuid == item.uuid) {
        _item.selected = true;
      }
    })

    if (!this.getWindowData().detailSidePageWindowUuid) {

      let newWindowUuid = genUniqueId('window-VmInstanceDetailSidePage-');
      this.props.createWindow(
        this.props.windowUuid,
        {
          detailSidePageDataUuid: item.uuid,
          detailSidePageWindowUuid: newWindowUuid
        },
        newWindowUuid,
        {
          uuid: item.uuid
        }
      );
    } else {
      this.props.updateWindow(
        this.getWindowData().detailSidePageWindowUuid,
        {
          uuid: item.uuid
        }
      )
    }
      
  },
  onSelectSingleItem: function(item) {
    let newList = Object.assign([], this.getWindowData().list);

    for (var i in newList) {
      if (newList[i].uuid == item.uuid) {
        newList[i].selected = true;
      } else {
        newList[i].selected = false;
      }
    }

    this.props.updateWindow(this.props.windowUuid, {
      list: newList
    })
  },
  onSelectMultipleItem: function(item) {
    let newList = Object.assign([], this.getWindowData().list);

    for (var i in newList) {
      if (newList[i].uuid == item.uuid) {
        newList[i].selected = !newList[i].selected;
        break;
      }
    }

    this.props.updateWindow(this.props.windowUuid, {
      list: newList
    })
  },
  setSelectAll: function() {
    let windowData = this.getWindowData();
    let newSelectAllState = !windowData.selectAll;
    let newList = Object.assign([], this.getWindowData().list);

    for (var i in newList) {
      newList[i].selected = newSelectAllState;
    }

    this.props.updateWindow(this.props.windowUuid, {
      list: newList,
      selectAll: newSelectAllState
    })
  },
  closeDetailSidePage: function() {
    this.props.updateWindow(this.props.windowUuid, {
      detailSidePageWindowUuid: null
    });
  },
  onPageSizeChange: function(event) {
    this.props.updateWindow(this.props.windowUuid, {
      pageSize: parseInt(event.target.value),
      pageNumber: 1
    });
    let self = this;
    setTimeout(function() {self.queryList()}, 0);
  },
  onPageUp: function() {
    let windowData = this.getWindowData();
    if ((windowData.pageNumber - 1) >= 1) {
      this.props.updateWindow(this.props.windowUuid, {
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
      this.props.updateWindow(this.props.windowUuid, {
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
        list.push(Object.assign({}, dbList[item.uuid], {'selected': item.selected}));
      }
    })
    return list;
  },
  getInitData: function() {
    return {
      pageSize: 20,
      pageNumber: 1,
      pageCount: 0,
      selectAll: false
    }
  },
  pageSizeList: [5, 10, 20, 50]
};

export default ListBase;