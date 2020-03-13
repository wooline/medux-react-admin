let {ids} = request.body;
ids = Array.isArray(ids) ? ids : [];

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

ids.forEach(id => {
  if (roles[id] && !roles[id].fixed) {
    delete roles[id];
  }
});

result.statusCode = 200;
result.response = '';

return result;
