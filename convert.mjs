import fs from 'fs';
import crypto from 'crypto';

function sha256(input) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}

let srcUri = './source.md'
let secretUri = './secret.md'
let destUri = './README.md'
let srcFile = fs.readFileSync(srcUri, 'utf8')
let secretFile = fs.readFileSync(secretUri, 'utf8')

// Find all 9-16 digit numbers with a asterisk before them
let regex = new RegExp(/(\*\d{9,16})/g)
secretFile = secretFile.replace(regex, (match, p1) => {
  let hash = sha256(p1)
  return `https://kqwq.github.io/meta-khan?hash=${hash}`
})

// Insert secret file into source file
srcFile = srcFile.replace('<!-- INSERT SECRET FILE HERE -->', secretFile)

// Write to file
fs.writeFileSync(destUri, srcFile)