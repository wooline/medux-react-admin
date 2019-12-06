console.log(11, database);
let {pageCurrent = 1, pageSize = 20} = request.query;
pageCurrent = parseInt(pageCurrent);
pageSize = parseInt(pageSize);
const idStart = pageCurrent * pageSize;
const data = mockjs.mock({
  ['list|' + (pageSize - 4)]: [
    {
      'id|+1': idStart + 5,
      username: '@last',
      nickname: '@cname',
      'gender|1': ['male', 'female', 'unknow'],
      'age|24-50': 30,
      rolId: '4',
      roleName: '普通会员',
      'status|1': ['enable', 'disable', 'enable'],
      'loginTime|1514764800000-1575271277588': 1514764800000,
      'createdTime|1514764800000-1575271277588': 1514764800000,
      email: '@email',
    },
  ],
});

const list = [
  {
    id: idStart + 1,
    username: 'Superadmin',
    nickname: '李白',
    gender: 'male',
    age: 35,
    rolId: '1',
    roleName: '超级管理员',
    status: 'enable',
    loginTime: new Date('2019-10-20').getTime(),
    createdTime: new Date('2019-10-01').getTime(),
    email: 'sdfsdf@qq.com',
  },
  {
    id: idStart + 2,
    username: 'Admin',
    nickname: '夏天',
    gender: 'female',
    age: 25,
    rolId: '2',
    roleName: '普通管理员',
    status: 'enable',
    loginTime: new Date('2019-11-05').getTime(),
    createdTime: new Date('2019-05-08').getTime(),
    email: 'daefdsfs@163.com',
  },
  {
    id: idStart + 3,
    username: 'Lily',
    nickname: '莉莉',
    gender: 'female',
    age: 24,
    rolId: '3',
    roleName: '文章编辑',
    status: 'enable',
    loginTime: new Date('2019-08-28').getTime(),
    createdTime: new Date('2019-07-19').getTime(),
    email: 'revvc@sina.com.cn',
  },
  {
    id: idStart + 4,
    username: 'Jim',
    nickname: '大状',
    gender: 'male',
    age: 30,
    rolId: '3',
    roleName: '文章编辑',
    status: 'enable',
    loginTime: new Date('2019-09-08').getTime(),
    createdTime: new Date('2019-06-05').getTime(),
    email: '3rdsf@163.com',
  },
  ...data.list,
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
      totalItems: list.length + 100,
      totalPages: Math.ceil((list.length + 100) / pageSize),
    },
    list,
  },
};
