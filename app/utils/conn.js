import { apiCalls } from '../utils/remoteCall';

let conn = null;

loginCb = (ret) => {
  var msg = JSON.parse(ret.msg)['org.zstack.header.identity.APILogInReply']

  if (msg.success) {
  }
};

apiCb = (ret) => {
  var data = JSON.parse(ret.msg);
  var msg = firstItem(data);
  apiCalls[msg.session.callid].cb(msg);
};

export function getConn() {
  if (!conn) {
    conn = io.connect('http://172.20.13.87:5000');
    conn.on('login_ret', loginCb);
    conn.on('call_ret', apiCb);
  }
  return conn;
}