exports.handler = function(event, context, callback) {
  // To allow cross origin; also put it in the header for response below
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };
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
      headers,
      body: secretContent,
    });
  } else {
    callback(null, {
      // Unauthorized 401
      statusCode: 401,
      headers
    });
  }
};