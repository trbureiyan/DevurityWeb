import fs from 'fs';

async function main() {
  const res = await fetch('https://cdn.jsdelivr.net/npm/altcha@2/dist/altcha.min.js');
  const text = await res.text();
  fs.writeFileSync('./scratch/altcha_cdn.js', text);
  
  // Find occurrences of split in the code
  const lines = text.split('\n');
  console.log('Total characters:', text.length);
  
  // Let's search for split
  let idx = 0;
  while (true) {
    idx = text.indexOf('split', idx);
    if (idx === -1) break;
    console.log('Occurrence of split around index:', idx);
    console.log(text.substring(Math.max(0, idx - 100), Math.min(text.length, idx + 100)));
    console.log('-----------------');
    idx += 5;
  }
}

main().catch(console.error);
