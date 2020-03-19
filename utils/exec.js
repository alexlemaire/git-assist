module.exports = (cmd) => {
  // promisified version of child_process exec method
  return require('util').promisify(require('child_process').exec)(cmd)
  .then(res => res.stdout)
  .catch(res => {throw new Error(res.stderr)})
}
