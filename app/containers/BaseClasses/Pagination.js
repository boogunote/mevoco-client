import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import {
  updateWindow,
  destroyWindow
} from 'containers/App/windowActions';

import { selectWindow } from 'containers/App/selectors';

import { apiCall } from 'utils/remoteCall';
import { firstItem } from 'utils/helpers';

import {
  updateDbImageList
} from 'containers/App/dbActions';

import { selectDbImage } from 'containers/App/selectors';

import appStyles from 'containers/App/styles.css';

let Pagination = {
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
  }
};

export default Pagination;