const token = request.cookies.token;

const guest = {
  username: 'guest',
  hasLogin: false,
  sessionId: '',
  avatar: '/client/imgs/u1.jpg',
};
const admin = {
  username: 'admin',
  hasLogin: true,
  sessionId: 'afdsfasdfasf',
  avatar: '/client/imgs/u1.jpg',
};
return {
  statusCode: 200,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
  response: token ? admin : guest,
};
