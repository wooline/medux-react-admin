const {username, password} = request.body;
const result = {
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};

if (username === 'admin' && password === '123456') {
  result.statusCode = 200;
  result.cookies = [['token', 'asfdfdsf']];
  result.response = {
    username: 'admin',
    hasLogin: true,
    avatar: '/client/imgs/u1.jpg',
  };
} else {
  result.statusCode = 422;
  result.response = {
    message: '用户名或密码错误！',
  };
}

return result;
