let {id = '', info} = request.body;
id = id.toString();
info = info || {};

const result = {
  statusCode: 422,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};

const users = database.data.users;
const roles = database.data.roles;
const curItem = users[id];
if (!curItem) {
  result.response = {
    message: '目标不存在！',
  };
  return result;
}
if (curItem.fixed) {
  result.response = {
    message: '目标不允许修改！',
  };
  return result;
}
let {nickname = '', gender = 'unknow', roleId = '4', status = 'enable', email = ''} = info;
nickname = nickname.toString();
gender = gender.toString();
roleId = roleId.toString();
status = status.toString();
email = email.toString();

if (nickname.length > 20 || nickname.length < 2) {
  result.response = {
    message: '呢称必须为2-20位！',
  };
  return result;
}
if (!['male', 'female', 'unknow'].includes(gender)) {
  result.response = {
    message: '性别不合法！',
  };
  return result;
}

if (!['enable', 'disable'].includes(status)) {
  result.response = {
    message: '状态不合法！',
  };
  return result;
}
if (email.length > 50) {
  result.response = {
    message: 'Email不合法',
  };
  return result;
}
if (!roles[roleId]) {
  result.response = {
    message: '所选角色不合法',
  };
  return result;
}
roles[curItem.roleId].owner--;
roles[roleId].owner++;

curItem.nickname = nickname;
curItem.gender = gender;
curItem.roleId = roleId;
curItem.roleName = roles[roleId].roleName;
curItem.status = status;
curItem.email = email;

result.statusCode = 200;
result.response = '';

return result;
