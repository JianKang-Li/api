function delay(time, callback) {
  setTimeout(function () {
    callback()
  }, time)
}

function toJSON(text) {
  switch (typeof text) {
    case 'string': {
      const str = text.replace(/\s+|\\n/g, '')
      return eval('(' + str + ')')
    }
    case "object": {
      return text
    }
  }
}

function DateTimeFormat(text, num, fixed) {
  return text.toString().padStart(num, fixed)
}

function getTime() {
  const date = new Date()
  const y = DateTimeFormat(date.getFullYear(), 4, '0')
  const M = DateTimeFormat(date.getMonth() + 1, 2, '0')
  const d = DateTimeFormat(date.getDate(), 2, '0')
  let h = DateTimeFormat(date.getHours(), 2, '0')
  let m = DateTimeFormat(date.getMinutes(), 2, '0')
  let s = DateTimeFormat(date.getSeconds(), 2, '0')
  return `'${y}-${M}-${d} ${h}:${m}:${s}'`
}

module.exports = {
  delay,
  toJSON,
  DateTimeFormat,
  getTime
}