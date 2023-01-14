const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
      apiKey: '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',
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3000

app.post('/', async (req, res) => {
      const openai = new OpenAIApi(configuration)

      const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: "Who is the creator of Python?",
})

console.log(completion.data)
return res.send(completion.data)
})

// app.get('/models', async (req, res) => {
//       res.send(getResponse())
// });

app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
})
