let {title = '', content = '', editorIds = []} = request.body;
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

const users = database.data.users;

if (title.length > 20 || title.length < 2) {
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
  const curUser = users[uid];
  if (curUser) {
    users[uid].post++;
  }
  const id = Date.now().toString();
  const postsData = database.data.posts;
  postsData[id] = {
    id,
    createdTime: Date.now(),
    title,
    content,
    author: {id: uid, name: users[uid].nickname},
    editors: editorIds.map(id => ({id, name: users[id].nickname})),
    status: 'pending',
  };
  return {
    ...verifyToken,
    response: '',
  };
}
return verifyToken;
