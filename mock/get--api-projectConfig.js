return {
  statusCode: 200,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
  response: {tokenRenewalTime: database.data.config.tokenRenewalTime, noticeTimer: 15},
};
