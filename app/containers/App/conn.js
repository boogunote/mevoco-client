let conn = null;

export function getConn() {
  if (!conn)
    conn = io.connect('http://172.20.13.87:5000');
  return conn;
}