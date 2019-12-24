let {ids} = request.body;
ids = Array.isArray(ids) ? ids : [];

const users = database.data.users;
const roles = database.data.roles;

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

ids.forEach(id => {
  if (users[id]) {
    const roleId = users[id].roleId;
    delete users[id];
    roles[roleId].owner--;
  }
});

result.statusCode = 200;
result.response = '';

return result;
