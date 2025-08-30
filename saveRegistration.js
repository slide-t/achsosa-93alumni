const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);

  // Path to the JSON file (on server)
  const filePath = path.join(__dirname, 'alumniRegistrations.json');

  let registrations = [];
  if (fs.existsSync(filePath)) {
    registrations = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  registrations.push({ ...data, submittedAt: new Date().toISOString() });

  fs.writeFileSync(filePath, JSON.stringify(registrations, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Registration saved successfully!' })
  };
};
