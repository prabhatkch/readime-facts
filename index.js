const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const { Configuration, OpenAIApi } = require('openai')

// Load environment variables from .env file into process.env
dotenv.config()

// OpenAI configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
})

const app = express()

// Json parser and CORS Middleware
app.use(express.json())
app.use(cors())

// Post request from the client
app.post('/', async (req, res) => {
    const userPrompt = req.body.query
    const openai = new OpenAIApi(configuration)

    const completion = await openai.createCompletion({
        model: 'text-davinci-002',
        prompt: userPrompt,
    })

    console.log(completion.data) // TODO to remove

    return res.json({ response: completion.data.choices[0].text })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
