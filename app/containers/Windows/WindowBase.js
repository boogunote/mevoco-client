let WindowBase = {
  getWindowData: function () {
    return this.props.globalWindow[this.props.windowUuid];
  }
}

export default WindowBase;