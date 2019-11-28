let {pageCurrent = 1, pageSize = 50} = request.query;
pageCurrent = parseInt(pageCurrent);
pageSize = parseInt(pageSize);

const list = [
  {
    id: '1',
    roleName: '超级管理员',
    purviews: [
      'role.all',
      'user.create',
      'user.delete',
      'user.update',
      'user.list',
      'user.detail',
      'user.review',
      'article.create',
      'article.delete',
      'article.update',
      'article.list',
      'article.detail',
      'article.review',
    ],
    owner: 1,
    fixed: true,
    remark: '系统内置，不可修改',
    updateTime: new Date('2019-10-01').getTime(),
  },
  {
    id: '2',
    roleName: '普通管理员',
    purviews: [
      'user.create',
      'user.delete',
      'user.update',
      'user.list',
      'user.detail',
      'user.review',
      'article.create',
      'article.delete',
      'article.update',
      'article.list',
      'article.detail',
      'article.review',
    ],
    owner: 3,
    fixed: false,
    remark: '',
    updateTime: new Date('2019-10-01').getTime(),
  },
  {
    id: '3',
    roleName: '文章编辑',
    purviews: ['article.create', 'article.delete', 'article.update', 'article.list', 'article.detail', 'article.review'],
    owner: 8,
    fixed: false,
    remark: '',
    updateTime: new Date('2019-10-01').getTime(),
  },
  {
    id: '4',
    roleName: '普通会员',
    purviews: ['article.list', 'article.detail'],
    owner: 100,
    fixed: false,
    remark: '',
    updateTime: new Date('2019-10-01').getTime(),
  },
];
return {
  statusCode: 200,
  headers: {
    'x-delay': 1000,
    'content-type': 'application/json; charset=utf-8',
  },
  response: {
    listSummary: {
      pageCurrent,
      pageSize,
      totalItems: list.length,
      totalPages: Math.ceil(list.length / pageSize),
    },
    list,
  },
};
