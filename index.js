const express = require('express')
const cheerio = require('cheerio');
const cors = require('cors')
const axios = require('axios');
const PORT = 8000

const app = express()

app.use(cors())
url = 'https://www.theguardian.com/international'

app.get('/', (req, res) => {
    res.send('This is a web scaper')
})

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            const articles = []

            $('.fc-item__title', html).each(function () {
                const title = $(this).text()
                const url = $(this).find('a').attr('href')
                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }).catch((error) => console.log(error))
})



app.listen(PORT, (req, res) => {
    console.log('Listening on port' + PORT)
})