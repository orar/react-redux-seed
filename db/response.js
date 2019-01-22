
function createResponse(data, code, description) {
  return {
    data,
    code: code || 'ok',
    desription: description || '',
  };
}

module.exports = createResponse;
