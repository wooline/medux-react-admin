const token = JSON.parse(request.cookies.token || '{}');

const guest = {
  id: '',
  username: 'guest',
  hasLogin: false,
  sessionId: '',
  avatar: '/client/imgs/u1.jpg',
};
const admin = {
  id: token.id,
  username: token.id,
  hasLogin: true,
  sessionId: 'afdsfasdfasf',
  avatar: '/client/imgs/u1.jpg',
};

const headers = {
  'x-delay': 0,
  'content-type': 'application/json; charset=utf-8',
};

if (token.expired && Date.now() - token.expired < 0) {
  return {
    statusCode: 200,
    headers,
    response: admin,
  };
} else if (!token.expired || Date.now() - token.expired > 30000) {
  return {
    statusCode: 401,
    headers,
    response: '',
  };
} else {
  return {
    statusCode: 402,
    headers,
    response: token.expired,
  };
}
