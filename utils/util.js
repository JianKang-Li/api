function delay (time, callback) {
  setTimeout(function () {
    callback()
  }, time)
}

module.exports = {
  delay
}