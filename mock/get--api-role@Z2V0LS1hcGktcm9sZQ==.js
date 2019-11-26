let {pageCurrent = 1, pageSize = 50} = request.query;
pageCurrent = parseInt(pageCurrent);
pageSize = parseInt(pageSize);

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
      totalItems: 100,
      totalPages: Math.ceil(100 / pageSize),
    },
    list: [
      {
        id: 'superAdmin',
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
        fixed: true,
        remark: '系统内置，不可修改',
        updateTime: new Date('2019-10-01').getTime(),
      },
      {
        id: 'admin',
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
        remark: '',
        updateTime: new Date('2019-10-01').getTime(),
      },
      {
        id: 'editor',
        roleName: '文章编辑',
        purviews: ['article.create', 'article.delete', 'article.update', 'article.list', 'article.detail', 'article.review'],
        remark: '',
        updateTime: new Date('2019-10-01').getTime(),
      },
    ],
  },
};
