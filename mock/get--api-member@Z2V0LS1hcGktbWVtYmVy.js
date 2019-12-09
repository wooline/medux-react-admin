let {pageCurrent = 1, pageSize = 20} = request.query;
const {sorterField = '', sorterOrder = 'ascend'} = request.query;

pageCurrent = parseInt(pageCurrent) || 1;
pageSize = parseInt(pageSize) || 10;

const start = (pageCurrent - 1) * pageSize;
const end = start + pageSize;

const userList = Object.keys(database.data.users).map(id => {
  return database.data.users[id];
});
if (sorterField === 'createdTime') {
  if (sorterOrder === 'ascend') {
    userList.sort((a, b) => {
      return a.createdTime - b.createdTime;
    });
  } else if (sorterOrder === 'descend') {
    userList.sort((a, b) => {
      return b.createdTime - a.createdTime;
    });
  }
}
if (sorterField === 'loginTime') {
  if (sorterOrder === 'ascend') {
    userList.sort((a, b) => {
      return a.loginTime - b.loginTime;
    });
  } else if (sorterOrder === 'descend') {
    userList.sort((a, b) => {
      return b.loginTime - a.loginTime;
    });
  }
}
const totalItems = userList.length;
return {
  statusCode: 200,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
  response: {
    listSummary: {
      pageCurrent,
      pageSize,
      totalItems,
      totalPages: Math.ceil(userList.length / pageSize),
    },
    list: userList.slice(start, end),
  },
};
