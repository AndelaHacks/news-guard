const express = require('express')

const port = 3000

const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.post('api/v1/news', (req, res) => {
  
})

app.listen(port, () => console.log(`News Guard running on ${port}!`))