const git = require('isomorphic-git')
const fs = require('fs')

module.exports = async (args) => {
  await checkConfig().catch(err => {console.log(err); process.exit(1)})
  await gitProcess().catch(err => {console.log(err); process.exit(1)})
}

async function checkConfig() {
  let paths = ['user.name', 'user.email']
  for (const path of paths) {
    const entry = await git.getConfig({
      fs,
      dir: '.',
      path
    })
    if (!entry) {
      throw new Error(`Configuration missing for user ${path.replace('user.', '')}`)
    }
  }
}

async function gitProcess() {
  const promptly = require('promptly')
  const filepath = await promptly.prompt('Files to add (default: all): ', {default: '.'})
  const message = await promptly.prompt('Commit message: ')
  await git.add({
    fs,
    dir: '.',
    filepath
  })
  await git.commit({
    fs,
    dir: '.',
    message
  })
}
