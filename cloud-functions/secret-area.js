exports.handler = function(event, context, callback) {
  const secretContent = `
    <h3>Welcome to secret area</h3>
    <p>This is a password-protected area. You are seeing meaning your password is <strong>hacked</strong>.</p>
  `;
  let body;
  // event.body is literal text sent by user
  if(event.body) {
    body = JSON.parse(event.body);
  } else {
    body = {};
  }

  if(body.password == 'javascript' ) {
    callback(null, {
      statusCode: 200,
      body: secretContent,
    });
  } else {
    callback(null, {
      // Unauthorized 401
      statusCode: 401,
    });
  }
};