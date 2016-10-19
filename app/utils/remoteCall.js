import io from 'socket.io-client/dist/socket.io';
import sha512 from 'crypto-js/sha512';

import { firstItem, genUniqueId } from 'utils/helpers'

export let conn = null;
export let session = null;
let loginCb = null;
export let apiCalls = {};

export function loginByAccount(param) {

  // I don't know why. But should put a function here to keep the param.
  function getParam() {return param;};

  return new Promise(function(resolve, reject) {
    var param = getParam();
    var msg = {
      'org.zstack.header.identity.APILogInByAccountMsg': {
        accountName: param.accountName,
        password: sha512(param.password).toString()
      }
    };

    loginCb = function (ret) {
      var msg = JSON.parse(ret.msg)['org.zstack.header.identity.APILogInReply']
      resolve(msg);
    };
    var data = {'msg' : JSON.stringify(msg)};
    getConn().emit('login', data);
  });
}

export function apiCall(msg, evt) {
  console.log(msg)
  return new Promise(function(resolve, reject) {
    // var msg = {};
    // if (!msgBody)
    //   msgBody = {};
    // msg[apiName] = msgBody;
    // msg[apiName] = {
    //     count: false,
    //     start: 0,
    //     replyWithCount: true,
    //     conditions: []
    //   }

    var msgBody = firstItem(msg);
    msgBody.session = {};
    msgBody.session.uuid = localStorage.getItem('sessionUuid');
    msgBody.session.callid = genUniqueId('api');
    getConn().emit('call', JSON.stringify(msg));
    var cb = function(data) {
      resolve(data);
    }

    apiCalls[msgBody.session.callid] = {cb: cb, evt: evt};
  })
};

function apiCb(ret) {
  var data = JSON.parse(ret.msg);
  var msg = firstItem(data);
  apiCalls[msg.session.callid].cb(data);
};

export function getConn() {
  if (!conn) {
    conn = io.connect('http://172.20.13.87:5000');
    conn.on('login_ret', loginCb);
    conn.on('call_ret', apiCb);
  }
  return conn;
}

export function setSession(newSession) {
  session = newSession
}