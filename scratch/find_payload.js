import fs from 'fs';
const text = fs.readFileSync('./scratch/altcha_cdn.js', 'utf8');

// Find where verified event is dispatched with payload
let idx = text.indexOf('verified');
while (idx !== -1) {
  const chunk = text.substring(Math.max(0, idx - 200), Math.min(text.length, idx + 300));
  if (chunk.includes('payload') && (chunk.includes('btoa') || chunk.includes('JSON') || chunk.includes('base64'))) {
    console.log('=== verified + payload:', idx, '===');
    console.log(chunk);
    console.log('---');
  }
  idx = text.indexOf('verified', idx + 7);
}
