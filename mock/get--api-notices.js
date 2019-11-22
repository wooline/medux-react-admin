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
