const { google } = require('googleapis');

// Replace these with your actual credentials from Google Cloud Console
const CLIENT_ID = '872568158565-kemdfescvoujrvrlhtbaedq1edml2l8u.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Generate the authorization URL
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://mail.google.com/'],
  prompt: 'consent'
});

console.log('Authorize this app by visiting this URL:');
console.log(authUrl);
console.log('\nAfter authorizing, you will be redirected to a page with a code.');
console.log('Paste that code here and press Enter:');

// Read the authorization code from stdin
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter