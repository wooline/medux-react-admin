let {sorterField = '', sorterOrder = '', username = '', nickname = '', status = '', email = '', roleId = '', pageCurrent, pageSize, loginTime} = request.query;

sorterField = sorterField.toString();
sorterOrder = sorterOrder.toString();
username = username.toString();
nickname = nickname.toString();
status = status.toString();
email = email.toString();
roleId = roleId.toString();
loginTime = Array.isArray(loginTime) ? loginTime : [];
pageCurrent = parseInt(pageCurrent) || 1;
pageSize = parseInt(pageSize) || 10;

const start = (pageCurrent - 1) * pageSize;
const end = start + pageSize;

const result = {
  statusCode: 422,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};
const usersData = database.data.users;
let resourceList = Object.keys(usersData).map(id => {
  return usersData[id];
});

if (username) {
  resourceList = resourceList.filter(item => item.username.includes(username));
}
if (nickname) {
  resourceList = resourceList.filter(item => item.nickname.includes(nickname));
}
if (status) {
  resourceList = resourceList.filter(item => item.status === status);
}
if (email) {
  resourceList = resourceList.filter(item => item.email === email);
}
if (roleId) {
  resourceList = resourceList.filter(item => item.roleId === roleId);
}
if (loginTime.length === 2) {
  resourceList = resourceList.filter(item => item.loginTime > loginTime[0] && item.loginTime < loginTime[1]);
}
if (sorterField === 'article') {
  if (sorterOrder === 'ascend') {
    resourceList.sort((a, b) => {
      return a.article - b.article;
    });
  } else if (sorterOrder === 'descend') {
    resourceList.sort((a, b) => {
      return b.article - a.article;
    });
  }
}
if (sorterField === 'createdTime') {
  if (sorterOrder === 'ascend') {
    resourceList.sort((a, b) => {
      return a.createdTime - b.createdTime;
    });
  } else if (sorterOrder === 'descend') {
    resourceList.sort((a, b) => {
      return b.createdTime - a.createdTime;
    });
  }
}
if (sorterField === 'loginTime') {
  if (sorterOrder === 'ascend') {
    resourceList.sort((a, b) => {
      return a.loginTime - b.loginTime;
    });
  } else if (sorterOrder === 'descend') {
    resourceList.sort((a, b) => {
      return b.loginTime - a.loginTime;
    });
  }
}
const totalItems = resourceList.length;

result.statusCode = 200;
result.response = {
  listSummary: {
    pageCurrent,
    pageSize,
    totalItems,
    totalPages: Math.ceil(resourceList.length / pageSize),
  },
  list: resourceList.slice(start, end),
};
return result;
