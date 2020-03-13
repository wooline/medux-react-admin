let {ids} = request.body;
ids = Array.isArray(ids) ? ids : [];

const users = database.data.users;
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

ids.forEach(id => {
  if (posts[id] && !posts[id].fixed) {
    const uid = posts[id].author.id;
    delete posts[id];
    users[uid].post--;
  }
});

result.statusCode = 200;
result.response = '';

return result;
