import { genUniqueId } from 'utils/helpers';

let ResourceList = {
  onClickTabRow: function(item) {
    this.props.pageVmShowDetail(item.uuid);

    let uuidList = [];
    this.props.pageVmList.forEach(function(item) {
      if (item.highlight) {
        uuidList.push(item.uuid)
      }
    })
    if (uuidList.length > 0)
      this.props.pageVmListNormal(uuidList);

    this.props.pageVmListHighlight([item.uuid]);

    let newWindowUuid = genUniqueId('window-VmInstanceDetailSidePage-');
    this.props.pageVmSetDetailSidePageUuid(newWindowUuid);
    this.props.updateWindow(newWindowUuid, {
      uuid: item.uuid
    });
      
  },
  closeDetailSidePage: function() {
    this.props.pageVmSetDetailSidePageUuid(null);
  },
};

export default ResourceList;