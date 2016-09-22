import { firstItem, genUniqueId } from 'utils/helpers'

import { remoteApiCallStart } from './actions'
import { selectGlobal } from './selectors';

export let apiCalls = {};

export function remoteCall(conn, session, remoteApiCallStart, apiName, msgBody, evt) {
  return new Promise(function(resolve, reject) {
    var msg = {};
    // if (!msgBody)
    //   msgBody = {};
    // msg[apiName] = msgBody;
    msg[apiName] = {
        count: false,
        start: 0,
        replyWithCount: true,
        conditions: []
      }

    var msgBody = firstItem(msg);
    msgBody.session = {};
    msgBody.session.uuid = session.uuid;
    msgBody.session.callid = genUniqueId('api');
    conn.emit('call', JSON.stringify(msg));
    var cb = function(data) {
      if (data.success)
        resolve(data);
      else
        reject(data);
    }

    apiCalls[msgBody.session.callid] = {cb: cb, evt: evt};
  })
};
