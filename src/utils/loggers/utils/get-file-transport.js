module.exports = (logger) => {
  return logger.transports.find(transport => transport.name === 'file')
}
