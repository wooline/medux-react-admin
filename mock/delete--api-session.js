const result = {
  statusCode: 200,
  cookies: [['token', '', {expires: new Date(Date.now() - 10000), httpOnly: true}]],
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
  response: '',
};

return result;
