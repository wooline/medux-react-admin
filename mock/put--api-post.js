let {ids, status = ''} = request.body;
ids = Array.isArray(ids) ? ids : [];
status = status.toString();

const posts = database.data.posts;

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

if (!['resolved', 'rejected'].includes(status)) {
  result.response = {
    message: '状态不合法！',
  };
  return result;
}
ids.forEach(id => {
  const curItem = posts[id];
  if (curItem && !curItem.fixed) {
    curItem.status = status;
  }
});

result.statusCode = 200;
result.response = '';

return result;
