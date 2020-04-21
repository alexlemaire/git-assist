module.exports = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = formatTime(now.getMonth() + 1)
  const day = formatTime(now.getDate())
  const hours = formatTime(now.getHours())
  const mins = formatTime(now.getMinutes())
  const secs = formatTime(now.getSeconds())
  const ms = formatMs(now.getMilliseconds())
  return `${year}-${month}-${day} @ ${hours}:${mins}:${secs}.${ms}`
}

function formatTime(time) {
  return time < 10 ? `0${time}` : `${time}`
}

function formatMs(ms) {
  return ms < 100 ? `${ms} ` : `${ms}`
}
