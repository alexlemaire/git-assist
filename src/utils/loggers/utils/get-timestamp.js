module.exports = (type) => {
  const now = new Date()
  switch (type) {
    case 'date':
      return getDate(now)
    case 'time':
      return getTime(now)
    default:
      return `${getDate(now)} @ ${getTime(now)}`
  }
}

function getTime (date) {
  const hours = formatTime(date.getHours())
  const mins = formatTime(date.getMinutes())
  const secs = formatTime(date.getSeconds())
  const ms = formatMs(date.getMilliseconds())
  return `${hours}:${mins}:${secs}.${ms}`
}

function getDate (date) {
  const year = date.getFullYear()
  const month = formatTime(date.getMonth() + 1)
  const day = formatTime(date.getDate())
  return `${year}-${month}-${day}`
}

function formatTime (time) {
  return `${time}`.padStart(2, '0')
}

function formatMs (ms) {
  return `${ms}`.padEnd(3)
}
