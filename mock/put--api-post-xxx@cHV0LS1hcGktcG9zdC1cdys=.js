let {id = '', title = '', content = '', editorIds = []} = request.body;
id = id.toString();
title = title.toString();
content = content.toString();
editorIds = Array.isArray(editorIds) ? editorIds : [];

const result = {
  statusCode: 422,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};

const postsData = database.data.posts;
const curItem = postsData[id];

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
const users = database.data.users;

if (title.length > 30 || title.length < 2) {
  result.response = {
    message: '标题必须为2-20个字符！',
  };
  return result;
}
if (content.length > 50 || content.length < 2) {
  result.response = {
    message: '内容必须为2-50个字符！',
  };
  return result;
}
if (editorIds.length === 0 || editorIds.some(id => !users[id] || users[id].roleId !== '3')) {
  result.response = {
    message: '责任编辑设置非法！',
  };
  return result;
}

const verifyToken = database.action.users.verifyToken(request.cookies.token);

if (verifyToken.statusCode === 200) {
  const uid = verifyToken.response.id;
  if (uid !== curItem.author.id) {
    result.response = {
      message: '只能修改自己发表的信息！',
    };
    return result;
  }
  Object.assign(curItem, {title, content, editors: editorIds.map(id => ({id, name: users[id].nickname}))});
  return {
    ...verifyToken,
    response: '',
  };
}
return verifyToken;
