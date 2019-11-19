const {username, password, phone} = request.body;
const result = {
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};

if (username === 'admin') {
  result.statusCode = 200;
  result.response = '';
} else {
  result.statusCode = 422;
  result.response = {
    message: '用户名已存在！',
  };
}

return result;
