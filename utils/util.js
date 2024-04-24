function delay (time, callback) {
  setTimeout(function () {
    callback()
  }, time)
}

function toJSON (text) {
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

function DateTimeFormat(text,num,fixed){
  return text.toString().padStart(num,fixed)
}

module.exports = {
  delay,
  toJSON,
  DateTimeFormat
}