const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const aboutDirectoryPath = path.join(__dirname, '../public/about')
const helpDirectoryPath = path.join(__dirname, '../public/help')

app.use(express.static(publicDirectoryPath))
app.use(express.static(aboutDirectoryPath))
app.use(express.static(helpDirectoryPath))

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: "50 degrees",
        location: "Philadelphia"
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})