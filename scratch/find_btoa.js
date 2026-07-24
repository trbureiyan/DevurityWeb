import fs from 'fs';
const text = fs.readFileSync('./scratch/altcha_cdn.js', 'utf8');

// Find btoa calls - this is how the payload is base64-encoded before sending
const positions = [];
let idx = text.indexOf('btoa');
while (idx !== -1) {
  positions.push(idx);
  idx = text.indexOf('btoa', idx + 4);
}
console.log('btoa occurrences:', positions.length);
for (const pos of positions) {
  console.log('=== btoa at', pos, '===');
  console.log(text.substring(Math.max(0, pos - 200), Math.min(text.length, pos + 200)));
  console.log('---');
}
