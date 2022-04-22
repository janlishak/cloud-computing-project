// first application

const express = require('express')
const app = express()
const port = 3000

// get the hostname of the application 
var os = require('os');
var hostname = os.hostname();


app.get('/', (req, res) => {
  res.send('Hello Jan! From ' + hostname)
})

app.listen(port, () => {
  console.log(`Example app listening at port 3000`)
})
