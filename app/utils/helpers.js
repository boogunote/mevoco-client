export function firstItem(obj) {
  return obj[Object.keys(obj)[0]];
}

export function genUniqueId(prefix) {
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  return prefix + "-" + randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
}

export function getRoutePath(props) {
  let routePath = '/'
  for (var i = 1; i < props.routes.length; i++) {
    routePath += props.routes[i].path;
    if (i != props.routes.length - 1) {
      routePath += '/';
    }
  }
  return routePath;
}