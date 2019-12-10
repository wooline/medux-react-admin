let {id = '', roleName = '', remark = '', purviews} = request.body;
id = id.toString();
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
const curItem = roles[id];
if (parseInt(id) < 5) {
  result.response = {
    message: '目标不允许修改！',
  };
  return result;
}
if (!curItem) {
  result.response = {
    message: '目标不存在！',
  };
  return result;
}
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

Object.assign(curItem, {roleName, remark, purviews});

result.statusCode = 200;
result.response = '';

return result;
