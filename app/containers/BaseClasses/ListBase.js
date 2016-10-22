
let ListBase = {
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