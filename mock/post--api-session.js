const {username, password, keep} = request.body;
const result = {
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};

if (username === 'admin' && password === '123456') {
  result.statusCode = 200;
  result.cookies = [['token', 'asfdfdsf', {expires: keep ? new Date(Date.now() + 60000) : undefined, httpOnly: true}]];
  result.response = {
    id: 'admin',
    username: 'admin',
    hasLogin: true,
    avatar: '/client/imgs/u1.jpg',
  };
} else if (username === 'superadmin' && password === '123456') {
  result.statusCode = 200;
  result.cookies = [['token', 'bdasfe', {expires: keep ? new Date(Date.now() + 24 * 3600 * 1000) : undefined, httpOnly: true}]];
  result.response = {
    id: 'superadmin',
    username: 'superadmin',
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
