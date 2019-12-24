let {ids, status = ''} = request.body;
ids = Array.isArray(ids) ? ids : [];
status = status.toString();

const users = database.data.users;

const result = {
  statusCode: 422,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};

if (ids.length === 0) {
  result.response = {
    message: '参数不合法！',
  };
  return result;
}
if (ids.some(id => ['superadmin', 'admin', 'editor', 'member'].includes(id))) {
  result.response = {
    message: '目标不允许删除！',
  };
  return result;
}
if (!['enable', 'disable'].includes(status)) {
  result.response = {
    message: '状态不合法！',
  };
  return result;
}
ids.forEach(id => {
  const curItem = users[id];
  if (curItem) {
    curItem.status = status;
  }
});

result.statusCode = 200;
result.response = '';

return result;
