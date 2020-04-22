module.exports = (info, path) => {
  const fs = require('fs')
  const data = `Key-Type: 1\nKey-Length: 4096\nSubkey-Type: 1\nSubkey-Length: 4096\nName-Real: ${info.name}\nName-Email: ${info.email}\nExpire-Date: 0\nPassphrase: ${info.pwd}`
  clog.info('Creating key definition file...')
  fs.writeFileSync(path, data, 'utf-8')
  clog.success('File created!')
}
