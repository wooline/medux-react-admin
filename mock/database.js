function createMap(obj = {}, len = 50, prot) {
  if (prot === undefined) {
    prot = Object.keys(obj).length;
  }
  return new Proxy(obj, {
    set: function(target, key, value, receiver) {
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
      console.log('set', key, '=', value);
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
const data = {
  users: createMap({
    superadmin: {
      id: 'superadmin',
      username: 'superadmin',
      password: '123456',
      hasLogin: true,
    },
    admin: {
      id: 'admin',
      username: 'admin',
      password: '123456',
      hasLogin: true,
    },
  }),
};
const database = {
  data,
  action: {
    users: {
      addUser(user) {
        data.users[user.id] = user;
      },
    },
  },
};

return database;
