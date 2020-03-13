const crypto = require('crypto');
const mockjs = require('mockjs');
const timestamp = Date.now();
const headers = {
  'x-delay': 0,
  'content-type': 'application/json; charset=utf-8',
};

function createMap(obj = {}, len = 50, prot) {
  if (prot === undefined) {
    prot = Object.keys(obj).length;
  }
  let protKeys = Object.keys(obj);
  protKeys.length = prot;
  protKeys = protKeys.reduce((pre, cur) => {
    pre[cur] = true;
    return pre;
  }, {});
  return new Proxy(obj, {
    set: function(target, key, value, receiver) {
      if (protKeys[key]) {
        return false;
      }
      const result = Reflect.set(target, key, value, receiver);
      const keys = Object.keys(target);
      if (keys.length > len) {
        Reflect.deleteProperty(target, keys[prot]);
      }
      return result;
    },
    deleteProperty: function(target, key) {
      if (protKeys[key]) {
        return false;
      }
      delete target[key];
      return true;
    },
  });
}

function createArray(arr = [], len = 50, prot) {
  if (prot === undefined) {
    prot = arr.length;
  }
  return new Proxy(arr, {
    get: function(target, key, receiver) {
      switch (key) {
        case 'push':
          return (...args) => {
            target.push(...args);
            const splcie = target.length - len;
            if (splcie > 0) {
              target.splice(prot, splcie);
            }
            return target.length;
          };
          break;
        case 'unshift':
          return (...args) => {
            target.splice(prot, 0, ...args);
            if (target.length > len) {
              target.length = len;
            }
            return target.length;
          };
          break;
        case 'splice':
          return (start, ...args) => {
            target.splice(prot + start, ...args);
            if (target.length > len) {
              target.length = len;
            }
            return target.length;
          };
          break;
      }
      return Reflect.get(target, key, receiver);
    },
    set: function(target, key, value, receiver) {
      const index = Number(key);
      if (!isNaN(index)) {
        if (index < prot) {
          return true;
        }
        if (index > len - 1) {
          key = len - 1;
        }
      } else if (key === 'length') {
        if (value > len) {
          value = len;
        }
      }
      return Reflect.set(target, key, value, receiver);
    },
  });
}

function createUsers() {
  const list = createMap({
    superadmin: {
      id: 'superadmin',
      username: 'superadmin',
      nickname: '张三',
      password: '123456',
      hasLogin: true,
      gender: 'unknow',
      post: 2,
      roleId: '1',
      roleName: '超级管理员',
      status: 'enable',
      loginTime: timestamp,
      createdTime: timestamp,
      email: 'wooline@qq.com',
      avatar: '/client/imgs/u1.jpg',
    },
    admin: {
      id: 'admin',
      username: 'admin',
      nickname: '李四',
      password: '123456',
      hasLogin: true,
      gender: 'unknow',
      post: 1,
      roleId: '2',
      roleName: '普通管理员',
      status: 'enable',
      loginTime: timestamp,
      createdTime: timestamp,
      email: 'abcde@qq.com',
      avatar: '/client/imgs/u1.jpg',
    },
    editor: {
      id: 'editor',
      username: 'editor',
      nickname: '莉莉',
      gender: 'female',
      post: 0,
      roleId: '3',
      roleName: '信息编辑',
      status: 'enable',
      loginTime: timestamp,
      createdTime: timestamp,
      email: 'revvc@sina.com.cn',
    },
    editor2: {
      id: 'editor2',
      username: 'editor2',
      nickname: '张小明',
      gender: 'female',
      post: 0,
      roleId: '3',
      roleName: '信息编辑',
      status: 'enable',
      loginTime: timestamp,
      createdTime: timestamp,
      email: '5564@sina.com.cn',
    },
    member: {
      id: 'member',
      username: 'member',
      nickname: '小明',
      gender: 'female',
      post: 0,
      roleId: '4',
      roleName: '普通会员',
      status: 'enable',
      loginTime: timestamp,
      createdTime: timestamp,
      email: 'xiaomin@qq.com',
    },
  });
  mockjs
    .mock({
      'list|25': [
        {
          'id|+1': 1,
          username: '@last',
          nickname: '@cname',
          password: '123456',
          hasLogin: true,
          'gender|1': ['male', 'female', 'unknow'],
          post: 0,
          roleId: '4',
          roleName: '普通会员',
          'status|1': ['enable', 'disable', 'enable'],
          loginTime: timestamp,
          createdTime: timestamp,
          avatar: '/client/imgs/u1.jpg',
          email: '@email',
        },
      ],
    })
    .list.forEach(item => {
      item.loginTime = item.createdTime = timestamp + item.id * 1000;
      item.id = item.username = item.username + item.id;
      list[item.id] = item;
    });
  return list;
}

function createRoles() {
  const purviews = [
    'role.all',
    'user.create',
    'user.delete',
    'user.update',
    'user.list',
    'user.detail',
    'user.review',
    'post.create',
    'post.delete',
    'post.update',
    'post.list',
    'post.detail',
    'post.review',
  ];
  const list = createMap({
    1: {
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
        'post.create',
        'post.delete',
        'post.update',
        'post.list',
        'post.detail',
        'post.review',
      ],
      owner: 1,
      fixed: true,
      remark: '系统内置，不可修改',
      createdTime: timestamp,
    },
    2: {
      id: '2',
      roleName: '普通管理员',
      purviews: ['user.create', 'user.delete', 'user.update', 'user.list', 'user.detail', 'user.review', 'post.create', 'post.delete', 'post.update', 'post.list', 'post.detail', 'post.review'],
      owner: 1,
      fixed: true,
      remark: '系统内置，不可修改',
      createdTime: timestamp,
    },
    3: {
      id: '3',
      roleName: '信息编辑',
      purviews: ['post.create', 'post.delete', 'post.update', 'post.list', 'post.detail', 'post.review'],
      owner: 2,
      fixed: true,
      remark: '系统内置，不可修改',
      createdTime: timestamp,
    },
    4: {
      id: '4',
      roleName: '普通会员',
      purviews: ['post.list', 'post.detail'],
      owner: 26,
      fixed: true,
      remark: '系统内置，不可修改',
      createdTime: timestamp,
    },
  });
  mockjs
    .mock({
      'list|26': [
        {
          'id|+1': 5,
          roleName: '@ctitle(2, 8)',
          purviews: () => {
            const start = Math.floor(Math.random() * (purviews.length - 1));
            const len = Math.ceil(Math.random() * (purviews.length - start));
            return purviews.slice(start, start + len);
          },
          owner: 0,
          fixed: false,
          remark: '',
          createdTime: timestamp,
        },
      ],
    })
    .list.forEach(item => {
      item.createdTime = timestamp + item.id * 1000;
      item.id = '' + item.id;
      list[item.id] = item;
    });
  return list;
}

function createPosts() {
  const list = createMap({
    1: {
      id: '1',
      title: '美丽的西双版纳',
      content: mockjs.Random.cparagraph(1, 3),
      author: {id: 'superadmin', name: '张三'},
      editors: [{id: 'editor', name: '莉莉'}],
      createdTime: timestamp,
      status: 'resolved',
    },
    2: {
      id: '2',
      title: '张家界五日游',
      content: mockjs.Random.cparagraph(1, 3),
      author: {id: 'superadmin', name: '张三'},
      editors: [{id: 'editor2', name: '张小明'}],
      createdTime: timestamp,
      status: 'resolved',
    },
    3: {
      id: '3',
      title: '走遍美利坚合众国',
      content: mockjs.Random.cparagraph(1, 3),
      author: {id: 'admin', name: '李四'},
      editors: [
        {id: 'editor', name: '莉莉'},
        {id: 'editor2', name: '张小明'},
      ],
      createdTime: timestamp,
      status: 'resolved',
    },
  });
  return list;
}
const data = {
  config: {
    version: Date.now(),
    tokenRenewalTime: 30000,
    purviews: {
      'role.all': '角色管理',
      'user.create': '新增',
      'user.delete': '删除',
      'user.update': '修改',
      'user.list': '列表',
      'user.detail': '详情',
      'user.review': '审核',
      'post.create': '新增',
      'post.delete': '删除',
      'post.update': '修改',
      'post.list': '列表',
      'post.detail': '详情',
      'post.review': '审核',
    },
  },
  roles: createRoles(),
  users: createUsers(),
  posts: createPosts(),
};

const database = {
  data,
  action: {
    users: {
      createToken(userId, expired) {
        const version = data.config.version;
        const curUser = data.users[userId];
        const digestData = [userId, curUser.password, expired, version].join(',');
        const md5 = crypto.createHash('md5');
        const digest = md5.update(digestData).digest('hex');
        const tokenData = {expired, userId, version, digest};
        const tokenStr = JSON.stringify(tokenData);
        const token = new Buffer(tokenStr).toString('base64');
        return token;
      },
      verifyToken(token) {
        if (token) {
          try {
            token = new Buffer(token, 'base64').toString();
            token = JSON.parse(token || '{}');
          } catch (e) {
            token = {};
          }
          const {expired, userId, version, digest} = token;
          if (expired && data.users[userId] && version === data.config.version && digest) {
            const since = Date.now() - expired;
            if (since < 0) {
              const curUser = data.users[userId];
              const digestData = [userId, curUser.password, expired, version].join(',');
              const md5 = crypto.createHash('md5');
              const digestStr = md5.update(digestData).digest('hex');
              if (digestStr === digest) {
                return {
                  statusCode: 200,
                  headers,
                  response: {...curUser},
                };
              }
            } else if (since < data.config.tokenRenewalTime) {
              return {
                statusCode: 402,
                headers,
                response: expired.toString(),
              };
            }
          }
        }
        return {
          statusCode: 401,
          headers,
          response: '',
        };
      },
    },
  },
};

return database;
