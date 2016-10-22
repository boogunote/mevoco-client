let WindowBase = {
  getWindowData: function () {
    return this.props.globalWindow[this.props.uuid];
  }
}

export default WindowBase;