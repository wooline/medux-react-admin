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

const users = database.users;

if (users[username] && password === users[username].password) {
  result.statusCode = 200;
  result.cookies = [['token', JSON.stringify({id: username, expired}), {expires: keep ? new Date(year) : undefined, httpOnly: true}]];
  result.response = database.users.admin;
} else {
  result.statusCode = 422;
  result.response = {
    message: '用户名或密码错误！',
  };
}

return result;
