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
  });
}
function createArray(arr = [], len = 50, prot) {
  if (prot === undefined) {
    prot = arr.length;
  }
  return new Proxy(arr, {
    set: function(target, key, value, receiver) {
      const index = Number(key);
      if (!isNaN(index)) {
        if (Reflect.get(target, 'length') >= len) {
          target.splice(prot, 1);
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

const users = createMap(
  {
    superadmin: {
      id: 'superadmin',
      username: 'superadmin',
      nickname: '张三',
      password: '123456',
      hasLogin: true,
      gender: 'unknow',
      age: '25',
      rolId: '1',
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
      age: '18',
      rolId: '2',
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
      age: 24,
      rolId: '3',
      roleName: '文章编辑',
      status: 'enable',
      loginTime: timestamp,
      createdTime: timestamp,
      email: 'revvc@sina.com.cn',
    },
  },
  32
);
mockjs
  .mock({
    'list|27': [
      {
        'id|+1': 1,
        username: '@last',
        nickname: '@cname',
        password: '123456',
        hasLogin: true,
        'gender|1': ['male', 'female', 'unknow'],
        'age|18-50': 30,
        rolId: '4',
        roleName: '普通会员',
        'status|1': ['enable', 'disable', 'enable'],
        loginTime: timestamp,
        createdTime: timestamp,
        avatar: '/client/imgs/u1.jpg',
        email: '@email',
      },
    ],
  })
  .list.forEach(user => {
    user.loginTime = user.createdTime = timestamp + user.id * 1000;
    user.id = user.username = user.username + user.id;
    users[user.id] = user;
  });

const data = {
  config: {tokenRenewalTime: 30000},
  users,
};

const database = {
  data,
  action: {
    users: {
      createToken(userId, expired) {
        const curUser = data.users[userId];
        const digestData = [userId, curUser.password, expired].join(',');
        const md5 = crypto.createHash('md5');
        const digest = md5.update(digestData).digest('hex');
        const tokenData = {expired, userId, digest};
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
          const {expired, userId, digest} = token;
          if (expired && userId && digest && data.users[userId]) {
            const since = Date.now() - expired;
            if (since < 0) {
              const curUser = data.users[userId];
              const digestData = [userId, curUser.password, expired].join(',');
              const md5 = crypto.createHash('md5');
              const digestStr = md5.update(digestData).digest('hex');
              if (digestStr === digest) {
                return {
                  statusCode: 200,
                  headers,
                  response: curUser,
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
      addUser(user) {
        data.users[user.id] = user;
      },
    },
  },
};

return database;
