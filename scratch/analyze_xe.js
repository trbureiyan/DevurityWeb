import fs from 'fs';

const text = fs.readFileSync('./scratch/altcha_cdn.js', 'utf8');

let idx = 0;
while (true) {
  idx = text.indexOf('Xe(', idx);
  if (idx === -1) break;
  console.log('Occurrence of Xe( around index:', idx);
  console.log(text.substring(Math.max(0, idx - 150), Math.min(text.length, idx + 150)));
  console.log('-----------------');
  idx += 3;
}
