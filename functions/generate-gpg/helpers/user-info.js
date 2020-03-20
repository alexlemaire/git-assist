module.exports = (gpgKey) => {
  consola.info('In order to add your new GPG key on GitHub:')
  console.log('  1. please follow this link: https://github.com/settings/keys')
  console.log('  2. click on "New GPG key"')
  console.log('  3. give a meaningful title to your new key and paste the content below into the "Key" field:\n')
  console.log(gpgKey)
}
