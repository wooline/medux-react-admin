const id = request.path.split('/').pop();
const result = {
  statusCode: 422,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
  response: '',
};
const item = database.data.roles[id];
if (!item) {
  result.statusCode = 404;
  return result;
}
result.statusCode = 200;
result.response = item;
return result;
