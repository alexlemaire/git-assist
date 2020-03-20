module.exports = (keyDefPath) => {
  const spawnSync = require('child_process').spawnSync
  consola.info('Started generating GPG key. Please hold on...')
  consola.info('If you try to generate multiple keys in a row this may take a while (low entropy). To help speed up the process simply use your computer for other tasks.')
  spawnSync('gpg', [
    '--gen-key',
    '--batch', keyDefPath
  ])
  consola.success('GPG key successfully generated!')
}
