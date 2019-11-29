const token = request.cookies.token;

if (!token) {
  return {
    statusCode: 401,
    headers: {
      'x-delay': 0,
      'content-type': 'application/json; charset=utf-8',
    },
    response: '',
  };
}

return {
  statusCode: 200,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
  response: {
    count: Math.round(Math.random() * 100),
  },
};
