module.exports = (info) => {
  const spawnSync = require('child_process').spawnSync
  console.log('\nInfo: generating SSH key...')
  spawnSync('ssh-keygen', [
    '-t', 'rsa',
    '-b', '4096',
    '-C', info.email,
    '-N', info.pwd,
    '-f', info.path
  ])
  console.log('Success: SSH key generated!')
}
