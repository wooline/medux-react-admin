const {username, password, keep} = request.body;
const result = {
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};

const year = Date.now() + 24 * 3600 * 365;
const week = Date.now() + 24 * 3600 * 7;

expired = keep ? week : year;

const users = database.data.users;
const curUser = users[username];
if (curUser && password === curUser.password) {
  curUser.loginTime = Date.now();
  const token = database.action.users.createToken(username, expired);
  result.statusCode = 200;
  result.cookies = [['token', token, {expires: keep ? new Date(year) : undefined, httpOnly: true}]];
  result.response = curUser;
} else {
  result.statusCode = 422;
  result.response = {
    message: '用户名或密码错误！',
  };
}

return result;
