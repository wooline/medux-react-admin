const {username, password, phone} = request.body;
const result = {
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};
const users = database.users;
if (users[username]) {
  result.statusCode = 422;
  result.response = {
    message: '用户名已存在！',
  };
} else {
  users[username] = {
    id: username,
    username: username,
    password: password,
    hasLogin: true,
  };
  result.statusCode = 200;
  result.response = '';
}

return result;
