let {sorterField = '', sorterOrder = '', title = '', author = '', status = '', editorId = '', pageCurrent, pageSize, createdTime} = request.query;

sorterField = sorterField.toString();
sorterOrder = sorterOrder.toString();
title = title.toString();
author = author.toString();
status = status.toString();
editorId = editorId.toString();
createdTime = Array.isArray(createdTime) ? createdTime : [];
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
const articlesData = database.data.articles;

let resourceList = Object.keys(articlesData).map(id => {
  return articlesData[id];
});

if (title) {
  resourceList = resourceList.filter(item => item.title.includes(title));
}
if (status) {
  resourceList = resourceList.filter(item => item.status === status);
}
if (author) {
  resourceList = resourceList.filter(item => item.author.name === author || item.author.id === author);
}
if (editorId) {
  resourceList = resourceList.filter(item => item.editors[0].id === editorId || (item.editors[1] && item.editors[1].id === editorId));
}
if (createdTime.length === 2) {
  resourceList = resourceList.filter(item => item.createdTime > createdTime[0] && item.createdTime < createdTime[1]);
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
