const verifyToken = database.action.users.verifyToken(request.cookies.token);

if (verifyToken.statusCode === 200) {
  return {
    ...verifyToken,
    response: {
      count: Math.round(Math.random() * 100),
    },
  };
}
return verifyToken;
