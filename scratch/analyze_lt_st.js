import fs from 'fs';

const text = fs.readFileSync('./scratch/altcha_cdn.js', 'utf8');

// search for function lt(
let idx = 0;
while (true) {
  idx = text.indexOf('function lt(', idx);
  if (idx === -1) break;
  console.log('Occurrence of function lt( around index:', idx);
  console.log(text.substring(Math.max(0, idx - 100), Math.min(text.length, idx + 200)));
  console.log('-----------------');
  idx += 12;
}

// search for function st(
idx = 0;
while (true) {
  idx = text.indexOf('function st(', idx);
  if (idx === -1) break;
  console.log('Occurrence of function st( around index:', idx);
  console.log(text.substring(Math.max(0, idx - 100), Math.min(text.length, idx + 200)));
  console.log('-----------------');
  idx += 12;
}
