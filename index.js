const reader = require("readline-sync")
const username = reader.question('Username: ')
console.log(username)

// testing with prompt
const prompt = require('prompt')
prompt.start()
const schema = {
  properties: {
    name: {
      description: 'Username: ',
      required: true
    },
    age: {
      description: 'Age: ',
      required: false
    }
  }
}
prompt.get(schema, function (err, result) {
    if (err) { return onErr(err) }
    Object.keys(schema.properties).forEach(key => {
      console.log(`${key}: ${result[key]}`)
    })
})
function onErr(err) {
    console.log(err)
    return 1
}
