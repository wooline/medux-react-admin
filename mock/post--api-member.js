let {username = '', password = '', info} = request.body;
username = username.toString();
password = password.toString();
info = info || {};

const result = {
  statusCode: 422,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};
const users = database.data.users;

const {nickname = username, gender = 'unknow', rolId = '4', roleName = '普通会员', status = 'enable', email = ''} = info;
const age = parseInt(info.age) || 0;

if (users[username]) {
  result.response = {
    message: '用户名已存在！',
  };
  return result;
}
if (!/^\w{5,20}$/.test(username)) {
  result.response = {
    message: '用户名必须为5-20位数字或字母！',
  };
  return result;
}
if (password.length > 20 || password.length < 5) {
  result.response = {
    message: '密码长度必须为5-20位！',
  };
  return result;
}
if (nickname.length > 20 || nickname.length < 5) {
  result.response = {
    message: '呢称必须为5-20位！',
  };
  return result;
}
if (!['male', 'female', 'unknow'].includes(gender)) {
  result.response = {
    message: '性别不合法！',
  };
  return result;
}
if (age > 100 || info < 10) {
  result.response = {
    message: '年龄不合法！',
  };
  return result;
}
if (!['enable', 'disable'].includes(status)) {
  result.response = {
    message: '状态不合法！',
  };
  return result;
}
if (email.length > 20) {
  result.response = {
    message: 'Email不合法',
  };
  return result;
}
users[username] = {
  id: username,
  username: username,
  password: password,
  hasLogin: true,
  avatar: '/client/imgs/u1.jpg',
  loginTime: Date.now(),
  createdTime: Date.now(),
  nickname,
  gender,
  age,
  rolId,
  roleName,
  status,
  email,
};

result.statusCode = 200;
result.response = '';

return result;
