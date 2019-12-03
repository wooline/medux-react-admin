const token = JSON.parse(request.cookies.token || '{}');

const headers = {
  'x-delay': 0,
  'content-type': 'application/json; charset=utf-8',
};
if (token.expired && Date.now() - token.expired < 0) {
  return {
    statusCode: 200,
    headers,
    response: {
      count: Math.round(Math.random() * 100),
    },
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
    response: token.expired.toString(),
  };
}
