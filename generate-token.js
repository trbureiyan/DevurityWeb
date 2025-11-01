import { google } from "googleapis";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// Replace these with your actual credentials from Google Cloud Console
const CLIENT_ID = "872568158565-kemdfescvoujrvrlhtbaedq1edml2l8u.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://mail.google.com/"],
  prompt: "consent",
});

console.log("Authorize this app by visiting this URL:");
console.log(authUrl);
console.log("\nAfter authorizing, you will be redirected to a page with a code.");

const rl = readline.createInterface({ input, output });
const code = await rl.question("Enter the authorization code: ");
rl.close();

try {
  const { tokens } = await oAuth2Client.getToken(code.trim());
  oAuth2Client.setCredentials(tokens);
  console.log("\nTokens received:", tokens);
  if (!tokens.refresh_token) {
    console.warn("No refresh token returned. Ensure 'prompt=consent' and remove any previously granted consent.");
  }
} catch (error) {
  console.error("Failed to exchange code for tokens:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
}