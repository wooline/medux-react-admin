let {roleName = '', remark = '', purviews} = request.body;
roleName = roleName.toString();
remark = remark.toString();
purviews = Array.isArray(purviews) ? purviews : [];

const result = {
  statusCode: 422,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};
const roles = database.data.roles;

if (roleName.length > 20 || roleName.length < 2) {
  result.response = {
    message: '角色名称必须为2-20个字符！',
  };
  return result;
}
if (remark.length > 20) {
  result.response = {
    message: '备注不能超过20个字符！',
  };
  return result;
}
if (purviews.length === 0 || purviews.some(purview => !database.data.config.purviews[purview])) {
  result.response = {
    message: '权限设置不合法！',
  };
  return result;
}
const id = Date.now();
roles[id] = {
  id,
  createdTime: Date.now(),
  owner: 0,
  roleName,
  remark,
  purviews: Array.from(new Set(purviews)),
};

result.statusCode = 200;
result.response = '';

return result;
